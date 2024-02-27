import { Publicador as PublicadorEntity } from './../database/entities/publicador.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Publicador } from './publicador.interface';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import {
  CreatePublicadorDto,
  TablaPublicadorDto,
  UpdatePublicadorDto,
} from 'src/database/dtos/publicador.dto';
import { GrupoService } from 'src/grupo/grupo.service';

@Injectable()
export class PublicadorService {
  constructor(
    @InjectRepository(PublicadorEntity)
    private publicadorRepository: Repository<PublicadorEntity>,
    private grupoService: GrupoService,
  ) {}
  obtenerPublicadores(): Promise<Publicador[] | undefined> {
    return this.publicadorRepository.find();
  }

  async obtenerTablaPublicadores(): Promise<TablaPublicadorDto[]> {
    const options = {
      relations: ['grupo', 'conductor'],
    };
    const publicadores = await this.publicadorRepository.find(options);
    const publicadoresDtos = publicadores.map((p) => {
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

  buscarPublicadorID(id: number): Promise<Publicador | undefined> {
    return this.publicadorRepository.findOne({
      where: { id },
      relations: ['grupo'],
    });
  }

  async createPublicador(
    publicadorDto: CreatePublicadorDto,
  ): Promise<Publicador> {
    const { nombre, apellido1, grupo_id } = publicadorDto;
    const grupo = await this.grupoService.buscarGrupo(grupo_id, false);
    const createdPublicador = this.publicadorRepository.create({
      nombre: nombre,
      apellido1: apellido1,
      grupo: grupo,
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

  async deletePublicador(id: number) {
    return await this.publicadorRepository.delete(id);
  }
}
