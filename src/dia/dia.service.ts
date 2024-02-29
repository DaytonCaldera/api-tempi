import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dia as DiaEntity } from 'src/dia/entities/dia.entity';
import { In, Repository } from 'typeorm';
import { Dia } from './dia.interface';
import { CreateDiaDto, UpdateDiaDto } from './dtos/dia.dto';

@Injectable()
export class DiaService {
  constructor(
    @InjectRepository(DiaEntity)
    private diaRepository: Repository<DiaEntity>,
  ) {}

  obtenerDias(): Promise<Dia[]> {
    return this.diaRepository.find();
  }
  obtenerDiasIds(ids: number[]): Promise<Dia[]> {
    return this.diaRepository.findBy({ id: In(ids) });
  }
  async guardarDia(dia: CreateDiaDto): Promise<Dia> {
    const createdDia = this.diaRepository.create({
      nombre: dia.nombre,
    });
    const savedDia = await this.diaRepository.save(createdDia);
    return savedDia;
  }
  async actualizarDia(diaDto: UpdateDiaDto): Promise<Dia> {
    const dia = await this.diaRepository.findOne({
      where: { id: diaDto.id },
    });
    if (!dia) {
      throw new Error('No se encontró la modalidad');
    }
    if (dia.nombre) {
      dia.nombre = diaDto.nombre;
    }
    const savedModalidad = await this.diaRepository.save(dia);
    return savedModalidad;
  }

  async borrarDia(id: number) {
    const dia = await this.diaRepository.findOne({ where: { id } });
    if (!dia) {
      throw new NotFoundException(`El dia con el id "${id}" no existe`);
    }
    return this.diaRepository.delete(dia);
  }
}
