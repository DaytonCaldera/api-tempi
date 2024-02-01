import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProgramaPredicacion as ProgramaPredicacionEntity } from 'src/database/entities/programa_predicacion.entity';
import { Repository } from 'typeorm';
import { ProgramaPredicacion } from './programa_predicacion.interface';
import {
  CreateProgramaPredicacionDto,
  UpdateProgramaPredicacionDto,
} from 'src/database/dtos/programa_predicacion.dto';
import { ConductorService } from 'src/conductor/conductor.service';
import { TerritorioService } from 'src/territorio/territorio.service';
import { PuntosService } from 'src/puntos/puntos.service';
import { FraccionService } from 'src/fraccion/fraccion.service';

@Injectable()
export class ProgramaPredicacionService {
  constructor(
    @InjectRepository(ProgramaPredicacionEntity)
    private programaRepository: Repository<ProgramaPredicacionEntity>,
    private puntosService: PuntosService,
    private conductorService: ConductorService,
    private territorioService: TerritorioService,
    private fraccionService: FraccionService,
  ) {}

  obtenerPrograma(): Promise<ProgramaPredicacion[]> {
    return this.programaRepository.find();
  }
  buscarPrograma(id: number): Promise<ProgramaPredicacion> {
    return this.programaRepository.findOne({
      where: { id },
      relations: ['punto', 'territorio', 'conductor', 'fraccion'],
      relationLoadStrategy: 'join',
    });
  }
  async guardarPrograma(
    programaDto: CreateProgramaPredicacionDto,
  ): Promise<ProgramaPredicacion> {
    const nuevoRegistroPrograma = new ProgramaPredicacionEntity();
    nuevoRegistroPrograma.fecha = programaDto.fecha;
    nuevoRegistroPrograma.conductor =
      await this.conductorService.buscarConductor(programaDto.conductor);
    nuevoRegistroPrograma.punto = await this.puntosService.buscarPunto(
      programaDto.punto,
    );
    if (programaDto.territorio.length > 0) {
      nuevoRegistroPrograma.territorio =
        await this.territorioService.buscarTerritorios(programaDto.territorio);
    }
    if (programaDto.fraccion.length > 0) {
      nuevoRegistroPrograma.fraccion =
        await this.fraccionService.buscarFracciones(programaDto.fraccion);
    }

    const createdPrograma = await this.programaRepository.create(
      nuevoRegistroPrograma,
    );
    const savedPrograma = await this.programaRepository.save(createdPrograma);
    console.log(savedPrograma);
    return savedPrograma;
  }
  actualizarPrograma(
    programaDto: UpdateProgramaPredicacionDto,
  ): Promise<ProgramaPredicacion> {
    throw new NotImplementedException(programaDto);
  }
}
