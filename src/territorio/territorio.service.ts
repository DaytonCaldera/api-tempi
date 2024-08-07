/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Territorio as TerritorioEntity } from 'src/territorio/entities/territorio.entity';
import { In, Repository, SelectQueryBuilder } from 'typeorm';
import { Territorio } from './territorio.interface';
import { CreateTerritorioDto, TablaTerritoriosDto, UpdateTerritorioDto } from './dtos/territorio.dto';
import { Fraccion as FraccionEntity } from 'src/fraccion/entities/fraccion.entity';
import { Fraccion } from 'src/fraccion/fraccion.interface';
import { UserProperties } from 'src/users/users.interface';
import { CongregacionService } from 'src/congregacion/congregacion.service';

@Injectable()
export class TerritorioService {
  constructor(
    @InjectRepository(TerritorioEntity)
    private readonly territorioRepository: Repository<TerritorioEntity>,
    @InjectRepository(FraccionEntity)
    private readonly fraccionRepository: Repository<FraccionEntity>,
    private congregacionService: CongregacionService,
  ) { }

  async createQueryBuilder(): Promise<SelectQueryBuilder<TerritorioEntity>> {
    return this.territorioRepository.createQueryBuilder('territorio');
  }

  async obtenerTerritorios(): Promise<Territorio[]> {
    const queryBuilder = await this.createQueryBuilder();
    queryBuilder.where('congregacionId = :cid', { cid: UserProperties.congregacion });
    return await queryBuilder.getMany();
  }

  async buscarTerritorio(id: number): Promise<Territorio> {
    const queryBuilder = await this.createQueryBuilder();
    queryBuilder.leftJoinAndSelect('territorio.fraccion', 'fraccion');
    queryBuilder.where('territorio.id = :id AND congregacionId = :cid', { id: id, cid: UserProperties.congregacion });
    return await queryBuilder.getOne();
    // return this.territorioRepository.findOne({ where: { id }, relations: ['fraccion'] });
  }
  buscarTerritorios(ids: number[]): Promise<Territorio[]> {
    return this.territorioRepository.find({ where: { id: In(ids) } });
  }
  async obtenerTablaTerritorios(): Promise<TablaTerritoriosDto[]> {
    const queryBuilder = await this.createQueryBuilder();
    queryBuilder.leftJoinAndSelect('territorio.fraccion', 'fraccion');
    queryBuilder.where('congregacionId = :cid', { cid: UserProperties.congregacion });
    const territorios = await queryBuilder.getMany();
    const territoriosDtos = territorios.map((territorio) => {
      const dto = new TablaTerritoriosDto();
      dto.id = territorio.id;
      dto.nombre = territorio.nombre;
      dto.mapa = territorio.mapa;
      dto.fraccion = territorio?.fraccion?.mapa ?? null;
      return dto;
    });
    return territoriosDtos;
  }

  async guardarTerritorio(territorioDto: CreateTerritorioDto, mapa: any): Promise<Territorio> {
    console.log(mapa);
    const createdTerritorio = this.territorioRepository.create({
      nombre: territorioDto.nombre,
      congregacion: await this.congregacionService.findOne(UserProperties.congregacion)
    });
    const savedTerritorio = await this.territorioRepository.save(createdTerritorio);
    return savedTerritorio;
  }

  async actualizarTerritorio(territorioDto: UpdateTerritorioDto): Promise<Territorio> {
    const territorio = await this.territorioRepository.findOne({ where: { id: territorioDto.id } });
    if (!territorio) throw new NotFoundException();
    territorio.nombre = territorioDto.nombre ? territorioDto.nombre : territorio.nombre;
    territorio.mapa = territorioDto.mapa ? territorioDto.mapa : territorio.mapa;
    territorio.fraccion = territorioDto.fraccion ? await this.buscarFraccionId(territorioDto.fraccion) : territorio.fraccion;
    const savedTerritorio = await this.territorioRepository.save(territorio);
    return savedTerritorio;
  }

  private async buscarFraccionId(id: number): Promise<Fraccion> {
    return this.fraccionRepository.findOne({ where: { id } });
  }
}
