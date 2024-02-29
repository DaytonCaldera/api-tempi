import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Modalidad } from './modalidad.interface';
import { Modalidad as ModalidadEntity } from './entities/modalidad.entity';

@Injectable()
export class ModalidadService {
  constructor(
    @InjectRepository(ModalidadEntity)
    private modalidaRepository: Repository<ModalidadEntity>,
  ) {}

  obtenerDias(): Promise<Modalidad[]> {
    return this.modalidaRepository.find();
  }
  obtenerModalidadesIds(ids: number[]): Promise<Modalidad[]> {
    return this.modalidaRepository.findBy({ id: In(ids) });
  }
  async guardarModalidad(modalidad: Modalidad): Promise<Modalidad> {
    const createdModalidad = this.modalidaRepository.create(modalidad);
    const savedModalidad = await this.modalidaRepository.save(createdModalidad);
    return savedModalidad;
  }
}
