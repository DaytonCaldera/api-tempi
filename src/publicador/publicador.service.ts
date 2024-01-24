import { Publicador as PublicadorEntity } from './../database/entities/publicador.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Publicador } from './publicador.interface';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class PublicadorService {
  constructor(
    @InjectRepository(PublicadorEntity)
    private publicadorRepository: Repository<PublicadorEntity>,
  ) {}
  obtenerPublicadores(): Promise<Publicador[] | undefined> {
    return this.publicadorRepository.find();
  }

  buscarPublicadorID(id: number): Promise<Publicador | undefined> {
    return this.publicadorRepository.findOne({ where: { id } });
  }

  async createPublicador(publicador: Publicador): Promise<Publicador> {
    const createdPublicador = this.publicadorRepository.create(publicador);
    const savedPublicador =
      await this.publicadorRepository.save(createdPublicador);
    return savedPublicador;
  }
}
