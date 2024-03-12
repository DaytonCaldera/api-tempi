/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Territorio as TerritorioEntity } from 'src/territorio/entities/territorio.entity';
import { In, Repository } from 'typeorm';
import { Territorio } from './territorio.interface';
import { CreateTerritorioDto, TablaTerritoriosDto, UpdateTerritorioDto } from './dtos/territorio.dto';
import { Fraccion as FraccionEntity } from 'src/fraccion/entities/fraccion.entity';
import { Fraccion } from 'src/fraccion/fraccion.interface';

@Injectable()
export class TerritorioService {
  constructor(
    @InjectRepository(TerritorioEntity)
    private readonly territorioRepository: Repository<TerritorioEntity>,
    @InjectRepository(FraccionEntity)
    private readonly fraccionRepository: Repository<FraccionEntity>,
  ) { }


  obtenerTerritorios(): Promise<Territorio[]> {
    return this.territorioRepository.find();
  }

  buscarTerritorio(id: number): Promise<Territorio> {
    return this.territorioRepository.findOne({ where: { id }, relations: ['fraccion'] });
  }
  buscarTerritorios(ids: number[]): Promise<Territorio[]> {
    return this.territorioRepository.find({ where: { id: In(ids) } });
  }
  async obtenerTablaTerritorios(): Promise<TablaTerritoriosDto[]> {
    const territorios = await this.territorioRepository.find({ relations: ['fraccion'] });
    const territoriosDtos = territorios.map((territorio) => {
      const dto = new TablaTerritoriosDto();
      dto.id =  territorio.id;
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
      nombre:territorioDto.nombre
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
