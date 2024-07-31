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

@Injectable()
export class PublicadorService {
  private queryBuilder: SelectQueryBuilder<PublicadorEntity>;
  constructor(
    @InjectRepository(PublicadorEntity)
    private publicadorRepository: Repository<PublicadorEntity>,
    private grupoService: GrupoService,
    private congregacionService: CongregacionService,
  ) {
    this.queryBuilder =
      this.publicadorRepository.createQueryBuilder('publicador');
  }
  obtenerPublicadores(): Promise<Publicador[] | undefined> {
    return this.queryBuilder
      .where('congregacionID = :cid', {
        cid: UserProperties.congregacion,
      })
      .getMany();
  }

  async obtenerTablaPublicadores(): Promise<TablaPublicadorDto[]> {
    const queryBuilder =
      await this.publicadorRepository.createQueryBuilder('publicador');
    queryBuilder.where('publicador.congregacionId = :cid', {
      cid: UserProperties.congregacion,
    });
    queryBuilder.leftJoinAndSelect('publicador.grupo', 'grupo');
    queryBuilder.leftJoinAndSelect('publicador.conductor', 'conductor');
    const publicadores = await queryBuilder.getMany();
    const publicadoresDtos = publicadores.map((p: any) => {
      const publicadorDto = new TablaPublicadorDto();
      publicadorDto.id = p.id;
      publicadorDto.nombre = p.nombre;
      publicadorDto.apellido1 = p.apellido1;
      publicadorDto.grupo_id = p?.grupo?.id ?? null;
      publicadorDto.grupo = p?.grupo?.nombre ?? null;
      publicadorDto.es_conductor = !!p.conductor;
      return publicadorDto;
    });
    return publicadoresDtos;
  }

  async buscarPublicadorID(id: number): Promise<Publicador | undefined> {
    return await this.queryBuilder
      .where('id = :id AND congregacionID = :cid', {
        id: id,
        cid: UserProperties.congregacion,
      })
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
    });
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
    });
    publicador.nombre = nombre ?? publicador.nombre;
    publicador.apellido1 = apellido1 ?? publicador.apellido1;
    if (grupo_id) {
      const grupoActual = await this.grupoService.buscarGrupo(grupo_id);
      publicador.grupo = grupoActual;
    }
    const savedGrupo = await this.publicadorRepository.save(publicador);
    return savedGrupo;
  }

  //TODO: Desactivar publicador, no borrarlo. Asi en el futuro no hay que volver a ingresar un dato y se deja en alguna papelera
  async deletePublicador(id: number) {
    return await this.publicadorRepository.delete(id);
  }
}
