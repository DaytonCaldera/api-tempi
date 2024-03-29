import { Injectable, NotFoundException } from '@nestjs/common';
import { Conductor as ConductorEntity } from 'src/conductor/entities/conductor.entity';
import { Conductor } from './conductor.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import {
  CreateConductorDto,
  TablaConductorDto,
  UpdateConductorDto,
} from 'src/conductor/dtos/conductor.dto';
import { PublicadorService } from 'src/publicador/publicador.service';
import { DiaService } from 'src/dia/dia.service';
import { ModalidadService } from 'src/modalidad/modalidad.service';

@Injectable()
export class ConductorService {
  constructor(
    @InjectRepository(ConductorEntity)
    private conductorRepository: Repository<ConductorEntity>,
    private publicadorService: PublicadorService,
    private diaService: DiaService,
    private modalidadService: ModalidadService,
  ) {}

  obtenerConductores(): Promise<Conductor[]> {
    return this.conductorRepository.find({ relations: ['publicador'] });
  }

  async obtenerTablaConductores(): Promise<TablaConductorDto[]> {
    const conductores = await this.conductorRepository.find({
      relations: ['publicador', 'dias', 'modalidades'],
    });
    const conductoresDtos = conductores.map((c) => {
      const conductorRegistro = new TablaConductorDto();
      conductorRegistro.id = c.id;
      conductorRegistro.nombre_conductor = `${c.publicador.nombre} ${c.publicador.apellido1}`;
      conductorRegistro.dias = c.dias;
      conductorRegistro.publicador = c.publicador;
      conductorRegistro.modalidad = c.modalidades;
      return conductorRegistro;
    });
    return conductoresDtos;
  }

  async buscarConductor(id: number): Promise<Conductor> {
    return await this.conductorRepository.findOne({
      where: { id },
      relations: ['publicador', 'dias', 'modalidades'],
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
    const modalidadEntities = await this.modalidadService.obtenerModalidadesIds(
      conductorDto.modalidad,
    );
    // Create a new Conductor entity
    const newConductor = this.conductorRepository.create({
      publicador: publicador,
      dias: diasEntities,
      modalidades: modalidadEntities,
    });

    // Save the new Conductor entity to the database
    const savedConductor = await this.conductorRepository.save(newConductor);

    return savedConductor;
  }

  async updateConductor(conductorDto: UpdateConductorDto): Promise<Conductor> {
    console.log('Updating Conductor...');

    const conductor = await this.buscarConductor(conductorDto.id);
    if (conductorDto.publicadorId) {
      conductor.publicador = await this.publicadorService.buscarPublicadorID(
        conductorDto.publicadorId,
      );
    }
    if (conductorDto.dias) {
      conductor.dias = await this.diaService.obtenerDiasIds(conductorDto.dias);
    }

    if (conductorDto.modalidad && conductorDto.modalidad.length > 0) {
      conductor.modalidades = await this.modalidadService.obtenerModalidadesIds(
        conductorDto.modalidad,
      );
    }
    const updatedConductor = await this.conductorRepository.save(conductor);

    return updatedConductor;
  }

  async deleteConductor(id: number) {
    const conductor = await this.buscarConductor(id);
    if (!conductor) {
      throw new NotFoundException();
    }
    // conductor.modalidades = null;
    // await this.conductorRepository.save(conductor);
    return this.conductorRepository.delete(id);
  }
}
