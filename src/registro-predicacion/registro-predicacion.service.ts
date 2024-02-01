import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegistroPredicacion as RegistroPredicacionEntity } from 'src/database/entities/registro_predicacion.entity';
import { Repository } from 'typeorm';
import { RegistroPredicacion } from './registro-predicacion.interface';
import {
  CreateRegistroPredicacionDto,
  UpdateRegistroPredicacionDto,
} from 'src/database/dtos/registro_predicacion.dto';
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
  ): Promise<RegistroPredicacion> {
    try {
      const { territorioId, asignados, inicio } = registroDto;
      const territorio =
        await this.territorioService.buscarTerritorio(territorioId);
      const conductores =
        await this.conductorService.buscarConductores(asignados);
      console.log(conductores);

      const nuevoRegistro = new RegistroPredicacionEntity();
      nuevoRegistro.asignados = conductores;
      nuevoRegistro.territorio = territorio;
      nuevoRegistro.inicio = inicio;
      console.log(nuevoRegistro);
      const createdRegistro =
        await this.registroRepository.insert(nuevoRegistro);
      const registro = await this.buscarRegistro(createdRegistro.raw.insertId);
      registro.asignados = conductores;
      // createdRegistro.id = undefined;
      const savedRegistro = await this.registroRepository.save(registro);
      console.log(savedRegistro);
      return savedRegistro;

      // return createdRegistro;
    } catch (err) {
      throw new InternalServerErrorException(
        'No se pudo crear el registro: ' + err.code,
      );
    }
  }

  async actualizarRegistro(
    registroDto: UpdateRegistroPredicacionDto,
  ): Promise<RegistroPredicacion> {
    try {
      const registroPredicacion = await this.buscarRegistro(registroDto.id);
      if (registroPredicacion == undefined)
        throw new NotFoundException(
          'No se encontro un registro de predicacion con ese ID: ' +
            registroDto.id,
        );
      const territorio = await this.territorioService.buscarTerritorio(
        registroDto.territorioId,
      );
      const conductores = await this.conductorService.buscarConductores(
        registroDto.asignados,
      );
      registroPredicacion.asignados = conductores;
      const savedRegistro =
        await this.registroRepository.save(registroPredicacion);
      console.log(registroPredicacion, territorio, conductores);
      return savedRegistro;
    } catch (err) {
      throw err;
    }
  }
}
