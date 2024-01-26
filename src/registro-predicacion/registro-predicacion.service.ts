import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegistroPredicacion as RegistroPredicacionEntity } from 'src/database/entities/registro_predicacion.entity';
import { InsertResult, Repository } from 'typeorm';
import { RegistroPredicacion } from './registro-predicacion.interface';
import { CreateRegistroPredicacionDto } from 'src/database/dtos/registro_predicacion.dto';
import { TerritorioService } from 'src/territorio/territorio.service';
import { ConductorService } from 'src/conductor/conductor.service';

@Injectable()
export class RegistroPredicacionService {
  constructor(
    @InjectRepository(RegistroPredicacionEntity)
    private registroRepository: Repository<RegistroPredicacionEntity>,
    private territorioService: TerritorioService,
    private conductorService: ConductorService,
  ) {}

  obtenerRegistros(): Promise<RegistroPredicacion[]> {
    return this.registroRepository.find();
  }

  buscarRegistro(id: number): Promise<RegistroPredicacion> {
    return this.registroRepository.findOne({
      where: { id },
      relations: ['asignados', 'territorio'],
    });
  }

  async guardarRegistro(
    registroDto: CreateRegistroPredicacionDto,
  ): Promise<InsertResult> {
    try {
      const { territorioId, asignados, inicio } = registroDto;
      const territorio =
        await this.territorioService.buscarTerritorio(territorioId);
      const conductores =
        await this.conductorService.buscarConductores(asignados);
      console.log(conductores);

      // const nuevoRegistro = new RegistroPredicacionEntity();
      // nuevoRegistro.asignados = conductores;
      const createdRegistro = await this.registroRepository.insert({
        territorio: territorio,
        inicio: inicio,
        asignados: conductores,
      });

      // createdRegistro.id = undefined;
      // const savedRegistro = await this.registroRepository.save(createdRegistro);
      console.log(createdRegistro);
      // return savedRegistro;

      return createdRegistro;
    } catch (err) {
      throw new InternalServerErrorException(
        'No se pudo crear el registro: ' + err.code,
      );
    }
  }
}
