import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Fraccion as FraccionEntity } from 'src/fraccion/entities/fraccion.entity';
import { In, Repository } from 'typeorm';
import { Fraccion } from './fraccion.interface';
import {
  CreateFraccionDto,
  FraccionDrowdownDto,
  UpdateFraccionDto,
} from 'src/fraccion/dtos/fraccion.dto';
import { TerritorioService } from 'src/territorio/territorio.service';

@Injectable()
export class FraccionService {
  constructor(
    @InjectRepository(FraccionEntity)
    private fraccionRepository: Repository<FraccionEntity>,
    private territorioService: TerritorioService,
  ) {}

  obtenerFracciones(): Promise<Fraccion[]> {
    return this.fraccionRepository.find();
  }

  buscarFraccion(id: number): Promise<Fraccion> {
    return this.fraccionRepository.findOne({
      where: { id },
      relations: ['territorio'],
    });
  }
  buscarFracciones(ids: number[]): Promise<Fraccion[]> {
    return this.fraccionRepository.find({
      where: { id: In(ids) },
      relations: ['territorio'],
    });
  }

  async buscarIdsTerritorios(ids: string[]): Promise<string[]> {
    const fracciones = await this.fraccionRepository.find({
      relations: ['territorio'],
      where: { id: In(ids) },
    });
    const territoriosIds = fracciones.map(
      (fraccion) => `${fraccion.territorio.id}`,
    );
    return territoriosIds;
  }

  async obtenerDrowdownFracciones(): Promise<FraccionDrowdownDto[]> {
    const fracciones = await this.fraccionRepository.find({
      relations: ['territorio'],
    });
    return fracciones.map((f) => {
      return { id: f.id, nombre: f.territorio.nombre + ' (fraccion)' };
    });
  }

  async guardarFraccion(fraccionDto: CreateFraccionDto): Promise<Fraccion> {
    const { territorioId } = fraccionDto;
    const territorio =
      await this.territorioService.buscarTerritorio(territorioId);
    const createdFraccion = this.fraccionRepository.create({
      territorio: territorio,
      iniciado: fraccionDto.iniciado,
      programado: fraccionDto.programado,
      notas: fraccionDto.notas,
    });
    const savedFraccion = this.fraccionRepository.save(createdFraccion);
    console.log(savedFraccion);

    // return;
    return savedFraccion;
  }

  async actualizarFraccion(fraccionDto: UpdateFraccionDto): Promise<Fraccion> {
    const fraccion = await this.buscarFraccion(fraccionDto.id);
    if (!fraccion) throw new NotFoundException();
    fraccion.territorio = fraccionDto.territorio
      ? await this.territorioService.buscarTerritorio(fraccionDto.territorio)
      : fraccion.territorio;
    fraccion.notas = fraccionDto.notas ? fraccionDto.notas : fraccion.notas;
    fraccion.iniciado = fraccionDto.iniciado
      ? fraccionDto.iniciado
      : fraccion.iniciado;
    fraccion.programado = fraccionDto.programado
      ? fraccionDto.programado
      : fraccion.programado;
    fraccion.mapa = fraccionDto.mapa ? fraccionDto.mapa : fraccion.mapa;
    const savedFraccion = await this.fraccionRepository.save(fraccion);
    return savedFraccion;
  }
}
