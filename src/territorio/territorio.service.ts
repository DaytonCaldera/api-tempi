import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Territorio as TerritorioEntity } from 'src/database/entities/territorio.entity';
import { Repository } from 'typeorm';
import { Territorio } from './territorio.interface';

@Injectable()
export class TerritorioService {
  constructor(
    @InjectRepository(TerritorioEntity)
    private readonly territorioRepository: Repository<TerritorioEntity>,
  ) {}

  obtenerTerritorios(): Promise<Territorio[]> {
    return this.territorioRepository.find();
  }

  buscarTerritorio(id: number): Promise<Territorio> {
    return this.territorioRepository.findOne({ where: { id } });
  }

  guardarTerritorio(territorio: Territorio): Promise<Territorio> {
    const createdTerritorio = this.territorioRepository.create(territorio);
    const savedTerritorio = this.territorioRepository.save(createdTerritorio);
    return savedTerritorio;
  }
}
