import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Puntos as PuntosEntity } from 'src/puntos/entities/puntos.entity';
import { Repository } from 'typeorm';
import { Puntos } from './puntos.interface';
import { CreatePuntoDto, UpdatePuntoDto } from 'src/puntos/dtos/puntos.dto';
import { DiaService } from 'src/dia/dia.service';

@Injectable()
export class PuntosService {
  constructor(
    @InjectRepository(PuntosEntity)
    private puntosRepository: Repository<PuntosEntity>,
    private diaService: DiaService,
  ) {}

  obtenerPuntos(): Promise<Puntos[]> {
    return this.puntosRepository.find();
  }
  buscarPunto(id: number): Promise<Puntos> {
    return this.puntosRepository.findOne({
      where: { id },
      relations: ['dias'],
    });
  }
  async crearPunto(puntoDto: CreatePuntoDto): Promise<Puntos> {
    const { dias, nombre } = puntoDto;
    const diasEntities = await this.diaService.obtenerDiasIds(dias);
    const createdPunto = this.puntosRepository.create({
      nombre: nombre,
      dias: diasEntities,
    });
    const savedPunto = await this.puntosRepository.save(createdPunto);
    return savedPunto;
  }
  async actualizarPunto(puntoDto: UpdatePuntoDto): Promise<Puntos> {
    throw new NotImplementedException(puntoDto);
    return null;
  }
}
