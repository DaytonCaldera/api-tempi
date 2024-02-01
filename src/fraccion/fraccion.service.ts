import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Fraccion as FraccionEntity } from 'src/database/entities/fraccion.entity';
import { In, Repository } from 'typeorm';
import { Fraccion } from './fraccion.interface';
import { CreateFraccionDto } from 'src/database/dtos/fraccion.dto';
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
}
