import { Injectable } from '@nestjs/common';
import { Conductor as ConductorEntity } from 'src/database/entities/conductor.entity';
import { Conductor } from './conductor.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateConductorDto } from 'src/database/dtos/conductor.dto';
import { PublicadorService } from 'src/publicador/publicador.service';
import { DiaService } from 'src/dia/dia.service';

@Injectable()
export class ConductorService {
  constructor(
    @InjectRepository(ConductorEntity)
    private conductorRepository: Repository<ConductorEntity>,
    private publicadorService: PublicadorService,
    private diaService: DiaService,
  ) {}

  obtenerConductores(): Promise<Conductor[]> {
    return this.conductorRepository.find();
  }

  async buscarConductor(id: number): Promise<Conductor> {
    return await this.conductorRepository.findOne({
      where: { id },
      relations: ['publicador', 'dias'],
    });
  }

  async buscarConductores(ids: number[]): Promise<Conductor[]> {
    return await this.conductorRepository.find({
      where: { id: In(ids) },
      relations: ['publicador', 'dias'],
    });
  }

  async createConductor(
    conductorDto: CreateConductorDto,
  ): Promise<Conductor | undefined> {
    const { publicadorId, dias } = conductorDto;

    // Retrieve Publicador and Dias entities based on IDs
    const publicador =
      await this.publicadorService.buscarPublicadorID(publicadorId);
    const diasEntities = await this.diaService.obtenerDiasIds(dias);

    // Create a new Conductor entity
    const newConductor = this.conductorRepository.create({
      publicador: publicador,
      dias: diasEntities,
    });

    // Save the new Conductor entity to the database
    const savedConductor = await this.conductorRepository.save(newConductor);

    return savedConductor;
  }
}
