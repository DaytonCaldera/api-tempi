import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProgramaPredicacion as ProgramaPredicacionEntity } from 'src/programa_predicacion/entities/programa_predicacion.entity';
import { Between, DeleteResult, IsNull, Not, Repository } from 'typeorm';
import { ProgramaPredicacion } from './programa_predicacion.interface';
import {
  BusquedaFechasDto,
  CeldaTerritorio,
  CreateProgramaPredicacionDto,
  TablaProgramaDto,
  UpdateProgramaPredicacionDto,
} from 'src/programa_predicacion/dtos/programa_predicacion.dto';
import { ConductorService } from 'src/conductor/conductor.service';
import { TerritorioService } from 'src/territorio/territorio.service';
import { PuntosService } from 'src/puntos/puntos.service';
import { FraccionService } from 'src/fraccion/fraccion.service';
import { ModalidadService } from 'src/modalidad/modalidad.service';

@Injectable()
export class ProgramaPredicacionService {
  constructor(
    @InjectRepository(ProgramaPredicacionEntity)
    private programaRepository: Repository<ProgramaPredicacionEntity>,
    private puntosService: PuntosService,
    private conductorService: ConductorService,
    private territorioService: TerritorioService,
    private fraccionService: FraccionService,
    private modalidadService: ModalidadService,
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

  async obtenerProgramaTabla(
    fechasDto?: BusquedaFechasDto,
  ): Promise<TablaProgramaDto[]> {
    // 1. Retrieve registros based on fechasDto criteria
    const registros = await this.obtenerRegistros(fechasDto);

    // 2. Check if generar flag is set and fechasDto has a range
    if (fechasDto?.generar && fechasDto?.hay_rango()) {
      // 2.1 Generate predicted program for the given date range
      const programaPrediccion = this.generarProgramaPredicacionEntreFechas(
        this.generarRangoFechas(fechasDto.fecha_inicio, fechasDto.fecha_final),
        registros,
      );
      return programaPrediccion;
    }

    // 3. Convert registros to TablaProgramaDto format
    const tabla = registros.map(this.mapearRegistroATablaProgramaDto);
    return tabla as TablaProgramaDto[];
  }

  async obtenerRegistros(fechasDto?: BusquedaFechasDto): Promise<any[]> {
    const options = {
      relations: [
        'conductor.publicador',
        'territorio',
        'fraccion.territorio',
        'punto',
        'modalidad',
      ],
      where: fechasDto?.hay_rango()
        ? { fecha: Between(fechasDto.fecha_inicio, fechasDto.fecha_final) }
        : { fecha: Not(IsNull()) },
    };
    return await this.programaRepository.find(options);
  }

  mapearRegistroATablaProgramaDto(registro: any): TablaProgramaDto {
    return {
      id: registro.id,
      fecha: registro.fecha,
      conductor: registro.conductor.publicador.nombreCompleto,
      conductor_id: registro.conductor.id,
      punto: registro.punto.nombre,
      punto_id: registro.punto.id,
      modalidad_id: registro.modalidad.id,
      modalidad: registro.modalidad.nombre,
      territorios: [
        ...registro.fraccion.map(
          (f) =>
            ({
              territorio_id: f.id,
              territorio: f.territorio.nombre + '(fraccion)',
              fraccion: true,
            }) as CeldaTerritorio,
        ),
        ...registro.territorio.map(
          (t) =>
            ({
              territorio_id: t.id,
              territorio: t.nombre,
              fraccion: false,
            }) as CeldaTerritorio,
        ),
      ],
      guardado: true,
    };
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
    nuevoRegistroPrograma.modalidad =
      await this.modalidadService.obtenerModalidad(programaDto.modalidad);
    if (programaDto.territorios.length > 0) {
      nuevoRegistroPrograma.territorio =
        await this.territorioService.buscarTerritorios(programaDto.territorios);
    }
    if (programaDto.fracciones.length > 0) {
      nuevoRegistroPrograma.fraccion =
        await this.fraccionService.buscarFracciones(programaDto.fracciones);
    }
    const createdPrograma = await this.programaRepository.create(
      nuevoRegistroPrograma,
    );
    const savedPrograma = await this.programaRepository.save(createdPrograma);
    return savedPrograma;
  }
  async actualizarPrograma(
    programaDto: UpdateProgramaPredicacionDto,
  ): Promise<ProgramaPredicacion> {
    const registroPrograma = await this.programaRepository.findOne({
      where: { id: programaDto.id },
    });
    registroPrograma.fecha = programaDto.fecha
      ? programaDto.fecha
      : registroPrograma.fecha;

    registroPrograma.conductor = programaDto.conductor
      ? await this.conductorService.buscarConductor(programaDto.conductor)
      : registroPrograma.conductor;

    registroPrograma.punto = programaDto.punto
      ? await this.puntosService.buscarPunto(programaDto.punto)
      : registroPrograma.punto;

    registroPrograma.modalidad = programaDto.modalidad
      ? await this.modalidadService.obtenerModalidad(programaDto.modalidad)
      : registroPrograma.modalidad;

    if (programaDto.territorios.length > 0) {
      registroPrograma.territorio =
        await this.territorioService.buscarTerritorios(programaDto.territorios);
    } else {
      registroPrograma.territorio = null;
    }
    if (programaDto.fracciones.length > 0) {
      registroPrograma.fraccion = await this.fraccionService.buscarFracciones(
        programaDto.fracciones,
      );
    } else {
      registroPrograma.fraccion = null;
    }
    const savedPrograma = await this.programaRepository.save(registroPrograma);
    return savedPrograma;
  }

  generarRangoFechas(inicio: Date, fin: Date): Date[] {
    const fechas = [];
    const fechaActual = new Date(inicio);
    while (fechaActual <= fin) {
      fechas.push(new Date(fechaActual));
      fechaActual.setDate(fechaActual.getDate() + 1);
    }
    return fechas;
  }

  generarProgramaPredicacionEntreFechas(
    fechas: any,
    registros: any,
  ): TablaProgramaDto[] {
    const tabla: TablaProgramaDto[] = [];

    // Filter registros for each fecha
    for (const fecha of fechas) {
      const registrosParaFecha = this.filtrarRegistrosPorFecha(
        registros,
        fecha,
      );

      // Process registrosParaFecha
      if (registrosParaFecha.length) {
        this.procesarRegistrosParaFecha(registrosParaFecha, tabla);
      } else {
        this.agregarRegistroEsqueleto(fecha, tabla);
      }
    }

    return tabla;
  }
  filtrarRegistrosPorFecha(registros: any, fecha: any): any[] {
    return registros.filter((registro) =>
      this.compararDosFechas(registro.fecha, fecha),
    );
  }
  procesarRegistrosParaFecha(
    registrosParaFecha: any,
    tabla: TablaProgramaDto[],
  ): void {
    for (const registro of registrosParaFecha) {
      const registroDto: TablaProgramaDto = {
        id: registro.id,
        fecha: registro.fecha,
        conductor: registro.conductor.publicador.nombreCompleto,
        conductor_id: registro.conductor.id,
        punto: registro.punto.nombre,
        punto_id: registro.punto.id,
        modalidad_id: registro.modalidad.id,
        modalidad: registro.modalidad.nombre,
        territorios: this.obtenerTerritoriosDeRegistro(registro),
        guardado: true,
      };

      tabla.push(registroDto);
    }
  }
  agregarRegistroEsqueleto(fecha: any, tabla: TablaProgramaDto[]): void {
    tabla.push({
      id: null, // o cualquier identificador temporal
      fecha: fecha,
      conductor: null,
      conductor_id: null,
      punto: null,
      punto_id: null,
      modalidad_id: null,
      modalidad: null,
      territorios: [],
      guardado: false,
    } as TablaProgramaDto);
  }

  obtenerTerritoriosDeRegistro(registro: any): CeldaTerritorio[] {
    const territoriosFraccion = registro.fraccion.map((f) => ({
      territorio_id: f.id,
      territorio: f.territorio.nombre + '(fraccion)',
      fraccion: true,
    }));

    const territoriosCompletos = registro.territorio.map((t) => ({
      territorio_id: t.id,
      territorio: t.nombre,
      fraccion: false,
    }));

    return [...territoriosFraccion, ...territoriosCompletos];
  }

  compararDosFechas(fecha_1: Date, fecha_2: Date) {
    fecha_1.setHours(0, 0, 0, 0);
    fecha_2.setHours(0, 0, 0, 0);
    return fecha_1.getTime() === fecha_2.getTime();
  }

  async eliminarPrograma(id: number): Promise<DeleteResult> {
    const programa = await this.programaRepository.findOne({ where: { id } });
    return this.programaRepository.delete(programa);
  }
}
