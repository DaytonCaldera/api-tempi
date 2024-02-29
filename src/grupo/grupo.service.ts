import { Grupo as GrupoEntity } from './entities/grupo.entity';
import { Injectable } from '@nestjs/common';
import { Grupo } from './grupo.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateGrupoDto,
  TablaGrupoDto,
  UpdateGrupoDto,
} from 'src/grupo/dtos/grupo.dto';
import { Publicador as PublicadorEntity } from 'src/publicador/entities/publicador.entity';
import { Publicador } from 'src/publicador/publicador.interface';

@Injectable()
export class GrupoService {
  constructor(
    @InjectRepository(GrupoEntity)
    private grupoRepository: Repository<GrupoEntity>,
    @InjectRepository(PublicadorEntity)
    private publicadorRepository: Repository<PublicadorEntity>,
  ) {}
  showMessage(message: string): string {
    return message;
  }
  obtenerGrupos(): Promise<Grupo[]> {
    return this.grupoRepository.find();
  }
  async obtenerTablaGrupos(): Promise<TablaGrupoDto[]> {
    const options = {
      relations: ['encargado', 'auxiliar'],
    };
    const grupos = await this.grupoRepository.find(options);
    const gruposDtos = grupos.map(
      (g) =>
        ({
          id: g.id,
          nombre: `${g.nombre}`,
          encargado_id: g.encargado ? g.encargado.id : null,
          encargado: g.encargado
            ? `${g.encargado?.nombre} ${g.encargado?.apellido1}`
            : null,
          auxiliar_id: g.auxiliar ? g.auxiliar.id : null,
          auxiliar: g.auxiliar
            ? `${g.auxiliar?.nombre} ${g.auxiliar?.apellido1}`
            : null,
        }) as any,
    );
    return gruposDtos as TablaGrupoDto[];
  }
  async createGrupo(grupoDto: CreateGrupoDto): Promise<Grupo> {
    const encargado = grupoDto.encargado
      ? await this.buscarPublicadorID(grupoDto.encargado)
      : null;
    const auxiliar = grupoDto.auxiliar
      ? await this.buscarPublicadorID(grupoDto.auxiliar)
      : null;
    const createdGrupo = this.grupoRepository.create({
      nombre: grupoDto.nombre,
      encargado: encargado ?? null,
      auxiliar: auxiliar ?? null,
    });
    const savedGrupo = await this.grupoRepository.save(createdGrupo);
    if (savedGrupo.encargado)
      savedGrupo.encargado.nombre =
        await `${savedGrupo.encargado?.nombre} ${savedGrupo.encargado?.apellido1}`;
    if (savedGrupo.auxiliar)
      savedGrupo.auxiliar.nombre =
        await `${savedGrupo.auxiliar?.nombre} ${savedGrupo.auxiliar?.apellido1}`;
    return savedGrupo;
  }

  async buscarGrupo(id: number, withRelations: boolean = true): Promise<Grupo> {
    const options = {
      where: { id },
      relations: [],
    };
    options.relations = withRelations
      ? ['publicadores', 'encargado', 'auxiliar']
      : undefined;
    const grupo = await this.grupoRepository.findOne(options);
    return grupo;
  }

  async updateGrupo(grupoDto: UpdateGrupoDto): Promise<Grupo> {
    const grupo = await this.buscarGrupo(grupoDto.id);
    console.log(grupo);
    if (grupoDto.encargado)
      grupo.encargado = await this.buscarPublicadorID(grupoDto.encargado);
    if (grupoDto.auxiliar)
      grupo.auxiliar = await this.buscarPublicadorID(grupoDto.auxiliar);
    if (grupoDto.nombre) grupo.nombre = grupoDto.nombre;
    const savedGrupo = await this.grupoRepository.save(grupo);
    if (savedGrupo?.encargado) {
      savedGrupo.encargado.nombre =
        `${savedGrupo.encargado?.nombre} ${savedGrupo.encargado?.apellido1}` ??
        null;
    }
    if (savedGrupo?.auxiliar) {
      savedGrupo.auxiliar.nombre =
        `${savedGrupo.auxiliar?.nombre} ${savedGrupo.auxiliar?.apellido1}` ??
        null;
    }
    return savedGrupo;
  }

  async deleteGrupo(id: number) {
    return await this.grupoRepository.delete(id);
  }

  async buscarPublicadorID(id: number): Promise<Publicador> {
    return this.publicadorRepository.findOne({ where: { id } });
  }
}
