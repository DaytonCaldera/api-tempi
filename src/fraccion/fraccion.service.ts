import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Fraccion as FraccionEntity } from 'src/fraccion/entities/fraccion.entity';
import { In, Repository, SelectQueryBuilder } from 'typeorm';
import { Fraccion } from './fraccion.interface';
import {
  CreateFraccionDto,
  FraccionDrowdownDto,
  UpdateFraccionDto,
} from 'src/fraccion/dtos/fraccion.dto';
import { TerritorioService } from 'src/territorio/territorio.service';
import { UserProperties } from 'src/users/users.interface';

@Injectable()
export class FraccionService {
  constructor(
    @InjectRepository(FraccionEntity)
    private fraccionRepository: Repository<FraccionEntity>,
    private territorioService: TerritorioService,
  ) {}

  async createQueryBuilder(): Promise<SelectQueryBuilder<FraccionEntity>> {
    return this.fraccionRepository.createQueryBuilder('fraccion');
  }

  async obtenerFracciones(): Promise<Fraccion[]> {
    const queryBuilder = await this.createQueryBuilder();
    queryBuilder.leftJoinAndSelect('fraccion.territorio', 'territorio');
    queryBuilder.where('territorio.congregacion = :cid', {
      cid: UserProperties.congregacion,
    });
    return await queryBuilder.getMany();
  }

  async buscarFraccion(id: number): Promise<Fraccion> {
    const queryBuilder = await this.createQueryBuilder();
    queryBuilder.leftJoinAndSelect('fraccion.territorio', 'territorio');
    queryBuilder.where('fraccion.id = :id AND territorio.congregacion = :cid', {
      id: id,
      cid: UserProperties.congregacion,
    });
    return await queryBuilder.getOne();
  }
  async buscarFracciones(ids: number[] | string[]): Promise<Fraccion[]> {
    const queryBuilder = await this.createQueryBuilder();
    queryBuilder.leftJoinAndSelect('fraccion.territorio', 'territorio');
    queryBuilder.where(
      'fraccion.id IN(:ids) AND territorio.congregacion = :cid',
      {
        ids: ids,
        cid: UserProperties.congregacion,
      },
    );
    return await queryBuilder.getMany();
  }

  async buscarIdsTerritorios(ids: string[]): Promise<string[]> {
    const fracciones = await this.buscarFracciones(ids);
    const territoriosIds = fracciones.map(
      (fraccion) => `${fraccion.territorio.id}`,
    );
    return territoriosIds;
  }

  async obtenerDrowdownFracciones(): Promise<FraccionDrowdownDto[]> {
    const fracciones = await this.obtenerFracciones();
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
