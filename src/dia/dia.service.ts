import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dia as DiaEntity } from 'src/dia/entities/dia.entity';
import { In, Repository } from 'typeorm';
import { Dia } from './dia.interface';

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
  async guardarDia(dia: Dia): Promise<Dia> {
    const createdDia = this.diaRepository.create(dia);
    const savedDia = await this.diaRepository.save(createdDia);
    return savedDia;
  }
}
