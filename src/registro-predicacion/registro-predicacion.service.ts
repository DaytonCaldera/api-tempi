import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegistroPredicacion as RegistroPredicacionEntity } from 'src/registro-predicacion/entities/registro_predicacion.entity';
import { Repository } from 'typeorm';
import { RegistroPredicacion } from './registro-predicacion.interface';
import {
  CreateRegistroPredicacionDto,
  UpdateRegistroPredicacionDto,
} from 'src/registro-predicacion/dtos/registro_predicacion.dto';
import { TerritorioService } from 'src/territorio/territorio.service';
import { ConductorService } from 'src/conductor/conductor.service';
import { PeriodoService } from 'src/periodo/periodo.service';

@Injectable()
export class RegistroPredicacionService {
  constructor(
    @InjectRepository(RegistroPredicacionEntity)
    private registroRepository: Repository<RegistroPredicacionEntity>,
    private territorioService: TerritorioService,
    private conductorService: ConductorService,
    private periodoService: PeriodoService,
  ) {}

  obtenerRegistros(): Promise<RegistroPredicacion[]> {
    return this.registroRepository.find();
  }
  obtenerRegistroTabla(): Promise<RegistroPredicacion[]> {
    return this.registroRepository.find({
      relations: ['territorio', 'asignados.publicador', 'periodo'],
    });
  }

  buscarRegistro(id: number): Promise<RegistroPredicacion> {
    return this.registroRepository.findOne({
      where: { id },
      relations: ['asignados', 'territorio', 'periodo'],
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

      const nuevoRegistro = new RegistroPredicacionEntity();
      nuevoRegistro.asignados = conductores;
      nuevoRegistro.territorio = territorio;
      nuevoRegistro.inicio = inicio;
      nuevoRegistro.periodo = registroDto.periodo
        ? await this.periodoService.buscarPeriodo(registroDto.periodo)
        : await this.periodoService.obtenerMaximoPeriodo();
      nuevoRegistro.programado = registroDto.programado
        ? registroDto.programado
        : null;
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
        err.message,
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
      registroPredicacion.territorio = registroDto.territorioId
        ? await this.territorioService.buscarTerritorio(
            registroDto.territorioId,
          )
        : registroPredicacion.territorio;
      registroPredicacion.periodo = registroDto.periodo
        ? await this.periodoService.buscarPeriodo(registroDto.periodo)
        : registroPredicacion.periodo;
      registroPredicacion.asignados = registroDto.asignados
        ? await this.conductorService.buscarConductores(registroDto.asignados)
        : registroPredicacion.asignados;
      registroPredicacion.inicio =
        registroDto.inicio ?? registroPredicacion.inicio;
      registroPredicacion.programado =
        registroDto.programado ?? registroPredicacion.programado;
      registroPredicacion.final =
        registroDto.final ?? registroPredicacion.final;
      registroPredicacion.dias = registroDto.final
        ? Math.floor(
            (new Date(registroPredicacion.final).getTime() -
              new Date(registroPredicacion.inicio).getTime()) /
              (1000 * 60 * 60 * 24),
          )
        : registroPredicacion.dias;
      const savedRegistro =
        await this.registroRepository.save(registroPredicacion);
      console.log(registroPredicacion);
      return savedRegistro;
    } catch (err) {
      throw err;
    }
  }
}
