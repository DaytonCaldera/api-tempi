import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Puntos as PuntosEntity } from 'src/puntos/entities/puntos.entity';
import { In, Repository } from 'typeorm';
import { Puntos } from './puntos.interface';
import {
  CreatePuntoDto,
  TablaPuntosDto,
  UpdatePuntoDto,
} from 'src/puntos/dtos/puntos.dto';
import { DiaService } from 'src/dia/dia.service';
import { Territorio as TerritorioEntity } from 'src/territorio/entities/territorio.entity';
import { Territorio } from 'src/territorio/territorio.interface';

@Injectable()
export class PuntosService {
  constructor(
    @InjectRepository(PuntosEntity)
    private puntosRepository: Repository<PuntosEntity>,
    private diaService: DiaService,
    @InjectRepository(TerritorioEntity)
    private territoriosRepository: Repository<TerritorioEntity>,
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
  async obtenerTablaTerritorios(): Promise<TablaPuntosDto[]> {
    const options = {
      relations: ['dias', 'grupo', 'territorios'],
    };
    const puntos = await this.puntosRepository.find(options);
    return puntos;
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
    const punto = await this.puntosRepository.findOne({
      where: { id: puntoDto.id },
    });
    punto.dias = puntoDto.dias
      ? await this.diaService.obtenerDiasIds(puntoDto.dias)
      : punto.dias;
    punto.nombre = puntoDto.nombre ?? punto.nombre;
    punto.territorios = puntoDto.territorios
      ? await this.buscarTerritoriosIds(puntoDto.territorios)
      : punto.territorios;
    const savedPunto = await this.puntosRepository.save(punto);
    return savedPunto;
  }

  async eliminarPunto(id: number) {
    return this.puntosRepository.delete(id);
  }
  async buscarTerritoriosIds(ids: number[]): Promise<Territorio[] | undefined> {
    return await this.territoriosRepository.find({ where: { id: In(ids) } });
  }
}
