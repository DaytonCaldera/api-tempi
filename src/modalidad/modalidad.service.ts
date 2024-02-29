import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Modalidad } from './modalidad.interface';
import { Modalidad as ModalidadEntity } from './entities/modalidad.entity';
import { CreateModalidadDto, UpdateModalidadDto } from './dtos/modalidad.dto';

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
  async guardarModalidad(modalidad: CreateModalidadDto): Promise<Modalidad> {
    const createdModalidad = this.modalidaRepository.create({
      modalidad: modalidad.modalidad,
    });
    const savedModalidad = await this.modalidaRepository.save(createdModalidad);
    return savedModalidad;
  }
  async actualizarModalidad(
    modalidadDto: UpdateModalidadDto,
  ): Promise<Modalidad> {
    const modalidad = await this.modalidaRepository.findOne({
      where: { id: modalidadDto.id },
    });
    if (!modalidad) {
      throw new Error('No se encontró la modalidad');
    }
    if (modalidadDto.modalidad) {
      modalidad.modalidad = modalidadDto.modalidad;
    }
    const savedModalidad = await this.modalidaRepository.save(modalidad);
    return savedModalidad;
  }

  async borrarModalidad(id: number) {
    const modalidad = await this.modalidaRepository.findOne({ where: { id } });
    if (!modalidad) {
      throw new NotFoundException(`La modalidad con el id "${id}" no existe`);
    }
    return this.modalidaRepository.delete(modalidad);
  }
}
