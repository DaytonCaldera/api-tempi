import { Publicador as PublicadorEntity } from './../database/entities/publicador.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Publicador } from './publicador.interface';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreatePublicadorDto } from 'src/database/dtos/publicador.dto';
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

  buscarPublicadorID(id: number): Promise<Publicador | undefined> {
    return this.publicadorRepository.findOne({
      where: { id },
      relations: ['grupo'],
    });
  }

  async createPublicador(
    publicadorDto: CreatePublicadorDto,
  ): Promise<Publicador> {
    const { nombre, apellido1, id_grupo } = publicadorDto;
    const grupo = await this.grupoService.buscarGrupo(id_grupo, false);
    const createdPublicador = this.publicadorRepository.create({
      nombre: nombre,
      apellido1: apellido1,
      grupo: grupo,
    });
    const savedPublicador =
      await this.publicadorRepository.save(createdPublicador);
    return savedPublicador;
  }
}
