import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Puntos as PuntosEntity } from 'src/puntos/entities/puntos.entity';
import { In, Repository, SelectQueryBuilder } from 'typeorm';
import { Puntos } from './puntos.interface';
import {
  CreatePuntoDto,
  TablaPuntosDto,
  UpdatePuntoDto,
} from 'src/puntos/dtos/puntos.dto';
import { DiaService } from 'src/dia/dia.service';
import { Territorio as TerritorioEntity } from 'src/territorio/entities/territorio.entity';
import { Territorio } from 'src/territorio/territorio.interface';
import { FraccionService } from 'src/fraccion/fraccion.service';
import { UserProperties } from 'src/users/users.interface';
import { CongregacionService } from 'src/congregacion/congregacion.service';

@Injectable()
export class PuntosService {
  constructor(
    @InjectRepository(PuntosEntity)
    private puntosRepository: Repository<PuntosEntity>,
    private diaService: DiaService,
    @InjectRepository(TerritorioEntity)
    private territoriosRepository: Repository<TerritorioEntity>,
    private fraccionService: FraccionService,
    private congregacionService: CongregacionService,
  ) {}

  async createQueryBuilder(): Promise<SelectQueryBuilder<PuntosEntity>> {
    return this.puntosRepository.createQueryBuilder('punto');
  }

  async obtenerPuntos(): Promise<Puntos[]> {
    const queryBuilder = await this.createQueryBuilder();
    queryBuilder.where('punto.congregacion = :cid', {
      cid: UserProperties.congregacion,
    });
    return await queryBuilder.getMany();
  }

  async buscarPunto(id: number): Promise<Puntos> {
    const queryBuilder = await this.createQueryBuilder();
    queryBuilder.leftJoinAndSelect('punto.dias', 'dias');
    queryBuilder.where('punto.id = :id AND punto.congregacion = :cid', {
      id: id,
      cid: UserProperties.congregacion,
    });
    return await queryBuilder.getOne();
  }
  async obtenerTablaTerritorios(): Promise<TablaPuntosDto[]> {
    const queryBuilder = await this.createQueryBuilder();
    queryBuilder.leftJoinAndSelect('punto.dias', 'dias');
    queryBuilder.leftJoinAndSelect('punto.grupo', 'grupo');
    queryBuilder.leftJoinAndSelect('punto.territorios', 'territorios');
    queryBuilder.where('punto.congregacion = :cid', {
      cid: UserProperties.congregacion,
    });
    return await queryBuilder.getMany();
  }

  async buscarPuntoPorTerritorios(territorios: string[], fracciones: string[]) {
    const territorios_fracciones =
      await this.fraccionService.buscarIdsTerritorios(fracciones);
    const queryBuilder =
      await this.puntosRepository.createQueryBuilder('puntos');
    queryBuilder.leftJoinAndSelect('puntos.territorios', 'territorios');
    queryBuilder.where('territorios.id IN (:...territorios)', {
      territorios: territorios.concat(territorios_fracciones),
    });
    const puntos = queryBuilder.getMany();
    return puntos;
  }

  async crearPunto(puntoDto: CreatePuntoDto): Promise<Puntos> {
    const { dias, nombre } = puntoDto;
    const diasEntities = await this.diaService.obtenerDiasIds(dias);
    const createdPunto = this.puntosRepository.create({
      nombre: nombre,
      dias: diasEntities,
      congregacion: await this.congregacionService.findOne(
        UserProperties.congregacion,
      ),
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
  async buscarTerritoriosIds(
    ids: number[],
    fracciones: boolean = false,
  ): Promise<Territorio[] | undefined> {
    if (fracciones) {
    }
    return await this.territoriosRepository.find({ where: { id: In(ids) } });
  }
}
