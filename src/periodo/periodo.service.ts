import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Periodo as PeriodoEntity } from 'src/periodo/entities/periodo.entity';
import { Repository } from 'typeorm';
import { Periodo } from './periodo.interface';
import { CreatePeriodoDto } from 'src/periodo/dtos/periodo.dto';

@Injectable()
export class PeriodoService {
  constructor(
    @InjectRepository(PeriodoEntity)
    private periodoRepository: Repository<PeriodoEntity>,
  ) {}

  obtenerPeriodos(): Promise<Periodo[]> {
    return this.periodoRepository.find();
  }
  buscarPeriodo(id: number): Promise<Periodo> {
    return this.periodoRepository.findOne({ where: { id } });
  }
  async guardarPeriodo(periodoDto: CreatePeriodoDto): Promise<Periodo> {
    const createdPeriodo = this.periodoRepository.create({
      inicio: periodoDto.inicio,
    });
    const savedPeriodo = await this.periodoRepository.save(createdPeriodo);
    return savedPeriodo;
  }
  actualizarPeriodo() {
    throw new NotImplementedException();
  }
}
