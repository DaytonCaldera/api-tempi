import { CongregacionService } from 'src/congregacion/congregacion.service';
import { Publicador as PublicadorEntity } from './entities/publicador.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Publicador } from './publicador.interface';
import { Injectable } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import {
  CreatePublicadorDto,
  TablaPublicadorDto,
  UpdatePublicadorDto,
} from 'src/publicador/dtos/publicador.dto';
import { GrupoService } from 'src/grupo/grupo.service';
import { UserProperties } from 'src/users/users.interface';
import { TareasService } from 'src/tareas/tareas.service';
import { Tarea } from 'src/tareas/entities/tarea.entity';
import { DiaService } from 'src/dia/dia.service';
import { ComboConductor } from 'src/conductor/dtos/conductor.dto';

@Injectable()
export class PublicadorService {
  constructor(
    @InjectRepository(PublicadorEntity)
    private publicadorRepository: Repository<PublicadorEntity>,
    private grupoService: GrupoService,
    private congregacionService: CongregacionService,
    private tareasService: TareasService,
    private diaService: DiaService,
  ) {}
  obtenerPublicadores(): Promise<Publicador[] | undefined> {
    return this.createQueryBuilder()
      .where('congregacionID = :cid', {
        cid: UserProperties.congregacion,
      })
      .getMany();
  }

  private createQueryBuilder(): SelectQueryBuilder<PublicadorEntity> {
    return this.publicadorRepository.createQueryBuilder('publicador');
  }

  async obtenerTablaPublicadores(): Promise<TablaPublicadorDto[]> {
    const queryBuilder = this.createQueryBuilder();
    // queryBuilder.select('*');
    queryBuilder.where('publicador.congregacionId = :cid', {
      cid: UserProperties.congregacion,
    });
    queryBuilder.innerJoinAndSelect('publicador.grupo', 'grupo');
    queryBuilder.leftJoinAndSelect('publicador.tareas', 'tarea');
    const publicadores = await queryBuilder.getMany();

    const publicadoresDtos = publicadores.map((p: any) => {
      const publicadorDto = new TablaPublicadorDto();
      publicadorDto.id = p.id;
      publicadorDto.nombre = p.nombre;
      publicadorDto.apellido1 = p.apellido1;
      publicadorDto.grupo_id = p?.grupo?.id ?? null;
      publicadorDto.grupo = p?.grupo?.nombre ?? null;
      publicadorDto.tareas = p.tareas.map((t) => t.id);
      // publicadorDto.tareas = p.tareas;
      return publicadorDto;
    });
    return publicadoresDtos;
  }

  verificarConductor(tareas: Tarea[]): boolean {
    if (tareas) {
      return tareas.some((t: Tarea) => t.nombre === 'Conductor');
    }
    return false;
  }

  async buscarPublicadorID(id: number): Promise<Publicador | undefined> {
    return await this.createQueryBuilder()
      .where('publicador.id = :id AND publicador.congregacionID = :cid', {
        id: id,
        cid: UserProperties.congregacion,
      })
      .leftJoinAndSelect('publicador.grupo', 'grupo')
      .leftJoinAndSelect('publicador.tareas', 'tareas')
      .getOne();
  }

  async createPublicador(
    publicadorDto: CreatePublicadorDto,
  ): Promise<Publicador> {
    const { nombre, apellido1, grupo_id } = publicadorDto;
    const congregacion = await this.congregacionService.findOne(
      UserProperties.congregacion,
    );
    const grupo = await this.grupoService.buscarGrupo(grupo_id, false);
    const createdPublicador = this.publicadorRepository.create({
      nombre: nombre,
      apellido1: apellido1,
      grupo: grupo,
      congregacion: congregacion,
      nombreCompleto: `${nombre} ${apellido1}`,
    });
    if (publicadorDto.tareas) {
      const tareas = await this.tareasService.buscarTareas(
        publicadorDto.tareas,
      );
      createdPublicador.tareas = tareas;
    }
    const savedPublicador =
      await this.publicadorRepository.save(createdPublicador);
    return savedPublicador;
  }
  async updatePublicador(
    publicadorDto: UpdatePublicadorDto,
  ): Promise<Publicador> {
    const { id, nombre, apellido1, grupo_id } = publicadorDto;
    const publicador = await this.publicadorRepository.findOne({
      where: { id },
      relations: ['congregacion'],
    });
    publicador.nombre = nombre ?? publicador.nombre;
    publicador.apellido1 = apellido1 ?? publicador.apellido1;
    if (grupo_id) {
      const grupoActual = await this.grupoService.buscarGrupo(grupo_id);
      publicador.grupo = grupoActual;
    }
    if (publicadorDto.tareas) {
      const tareas = await this.tareasService.buscarTareas(
        publicadorDto.tareas,
      );
      publicador.tareas = tareas;
    }
    const savedGrupo = await this.publicadorRepository.save(publicador);
    return savedGrupo;
  }

  //TODO: Desactivar publicador, no borrarlo. Asi en el futuro no hay que volver a ingresar un dato y se deja en alguna papelera
  async deletePublicador(id: number) {
    return await this.publicadorRepository.delete(id);
  }

  async buscarConductores(ids?: number[]): Promise<Publicador[]> {
    const consulta = await this.obtenerConsultaConductores(ids);
    console.log('AQUI', consulta.getQueryAndParameters());
    return consulta.getMany();
  }
  async buscarConductor(ids: number): Promise<Publicador> {
    const consulta = await this.obtenerConsultaConductores(ids);
    return consulta.getOne();
  }

  async obtenerConsultaConductores(
    ids?: number | number[],
  ): Promise<SelectQueryBuilder<PublicadorEntity>> {
    const queryBuilder = await this.createQueryBuilder().leftJoinAndSelect(
      'publicador.tareas',
      'tareas',
    );
    queryBuilder.where(
      'publicador.congregacionId = :cid AND tareas.nombre = "Conductor"',
      {
        cid: UserProperties.congregacion,
      },
    );
    if (ids != null) {
      queryBuilder.andWhere('ids IN(:ids)', {
        ids: ids,
      });
    }
    return await queryBuilder;
  }

  async obtenerConductoresSinDiaAsignado(): Promise<Publicador[]> {
    return await this.createQueryBuilder()
      .leftJoinAndSelect('publicador.tareas', 'tareas')
      .leftJoinAndSelect('publicador.dias', 'dia')
      .where('dia.id IS NULL AND tareas.nombre = "Conductor"')
      .where('congregacionId = :cid', { cid: UserProperties.congregacion })
      .getMany();
  }

  async obtenerConductoresConDiaAsignado(
    dia: string,
    notin?: number[],
  ): Promise<Publicador[]> {
    const queryBuilder = await this.createQueryBuilder();
    queryBuilder
      .leftJoinAndSelect('publicador.tareas', 'tareas')
      .leftJoinAndSelect('publicador.dias', 'dia')
      .where('dia.nombre = :nombreDia', { nombreDia: dia })
      .andWhere('publicador.congregacionId = :cid', {
        cid: UserProperties.congregacion,
      });
    if (notin != null) {
      queryBuilder.andWhere('publicador.id NOT IN(:ids)', {
        ids: notin,
      });
    }
    console.log(queryBuilder.getQueryAndParameters());
    return await queryBuilder.getMany();
  }

  async obtenerConductoresComboDisponibles(
    fecha: string,
  ): Promise<ComboConductor[]> {
    const conductoresDisponibles =
      await this.obtenerConductoresDisponibles(fecha);
    const comboConductores = conductoresDisponibles.map((publicador) => {
      return {
        id: publicador.id,
        label: publicador.nombreCompleto,
      };
    });
    return comboConductores as ComboConductor[];
  }
  async obtenerConductoresDisponibles(fecha: string): Promise<Publicador[]> {
    const dia = await this.diaService.obtenerDiaPorFecha(fecha);
    // Obtener conductores que no tienen días asignados (disponible todos los días).
    const conductoresSinDiaAsignado =
      await this.obtenerConductoresSinDiaAsignado();

    if (!dia) {
      // Si no se encuentra un día con ese nombre, retornamos solo los conductores sin día asignado.
      return conductoresSinDiaAsignado;
    }
    const ids_obtenidos = conductoresSinDiaAsignado.map((c) => c.id);
    // Obtener los conductores que tienen el día especificado asignado.
    const conductoresConDiaAsignado =
      await this.obtenerConductoresConDiaAsignado(dia.nombre, ids_obtenidos);

    const conductoresDisponibles = [
      ...conductoresSinDiaAsignado,
      ...conductoresConDiaAsignado,
    ];

    return conductoresDisponibles;
  }
}
