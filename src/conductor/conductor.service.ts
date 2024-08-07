import { Injectable } from '@nestjs/common';
import { Conductor as ConductorEntity } from 'src/conductor/entities/conductor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ConductorService {
  constructor(
    @InjectRepository(ConductorEntity)
    private conductorRepository: Repository<ConductorEntity>,
  ) {}

  // obtenerConductores(): Promise<Conductor[]> {
  //   return this.conductorRepository.find({ relations: ['publicador'] });
  // }

  // async obtenerTablaConductores(): Promise<TablaConductorDto[]> {
  //   const conductores = await this.conductorRepository.find({
  //     relations: ['publicador', 'dias', 'modalidades'],
  //   });
  //   const conductoresDtos = conductores.map((c) => {
  //     const conductorRegistro = new TablaConductorDto();
  //     conductorRegistro.id = c.id;
  //     conductorRegistro.nombre_conductor = `${c.publicador.nombre} ${c.publicador.apellido1}`;
  //     conductorRegistro.dias = c.dias;
  //     conductorRegistro.publicador = c.publicador;
  //     conductorRegistro.modalidad = c.modalidades;
  //     return conductorRegistro;
  //   });
  //   return conductoresDtos;
  // }

  // // async buscarConductor(id: number): Promise<Conductor> {
  // //   return await this.conductorRepository.findOne({
  // //     where: { id },
  // //     relations: ['publicador', 'dias', 'modalidades'],
  // //   });
  // // }

  // // async buscarConductores(ids: number[]): Promise<Conductor[]> {
  // //   return await this.conductorRepository.find({
  // //     where: { id: In(ids) },
  // //     relations: ['publicador', 'dias'],
  // //   });
  // // }

  // async createConductor(
  //   conductorDto: CreateConductorDto,
  // ): Promise<Conductor | undefined> {
  //   const { publicadorId, dias } = conductorDto;

  //   // Retrieve Publicador and Dias entities based on IDs
  //   const publicador =
  //     await this.publicadorService.buscarPublicadorID(publicadorId);
  //   const diasEntities = await this.diaService.obtenerDiasIds(dias);
  //   const modalidadEntities = await this.modalidadService.obtenerModalidadesIds(
  //     conductorDto.modalidad,
  //   );
  //   // Create a new Conductor entity
  //   const newConductor = this.conductorRepository.create({
  //     publicador: publicador,
  //     dias: diasEntities,
  //     modalidades: modalidadEntities,
  //   });

  //   // Save the new Conductor entity to the database
  //   const savedConductor = await this.conductorRepository.save(newConductor);

  //   return savedConductor;
  // }

  // async updateConductor(conductorDto: UpdateConductorDto): Promise<Conductor> {
  //   console.log('Updating Conductor...');

  //   const conductor = await this.buscarConductor(conductorDto.id);
  //   if (conductorDto.publicadorId) {
  //     conductor.publicador = await this.publicadorService.buscarPublicadorID(
  //       conductorDto.publicadorId,
  //     );
  //   }
  //   if (conductorDto.dias) {
  //     conductor.dias = await this.diaService.obtenerDiasIds(conductorDto.dias);
  //   }

  //   if (conductorDto.modalidad && conductorDto.modalidad.length > 0) {
  //     conductor.modalidades = await this.modalidadService.obtenerModalidadesIds(
  //       conductorDto.modalidad,
  //     );
  //   }
  //   const updatedConductor = await this.conductorRepository.save(conductor);

  //   return updatedConductor;
  // }

  // async deleteConductor(id: number) {
  //   const conductor = await this.buscarConductor(id);
  //   if (!conductor) {
  //     throw new NotFoundException();
  //   }
  //   // conductor.modalidades = null;
  //   // await this.conductorRepository.save(conductor);
  //   return this.conductorRepository.delete(id);
  // }

  // async obtenerConductoresComboDisponibles(
  //   fecha: string,
  // ): Promise<ComboConductor[]> {
  //   const conductoresDisponibles =
  //     await this.obtenerConductoresDisponibles(fecha);
  //   const comboConductores = conductoresDisponibles.map((conductor) => {
  //     return {
  //       id: conductor.id,
  //       label: conductor.publicador.nombreCompleto,
  //     };
  //   });
  //   return comboConductores as ComboConductor[];
  // }

  // async obtenerConductoresDisponibles(fecha: string): Promise<Conductor[]> {
  //   const dia = await this.diaService.obtenerDiaPorFecha(fecha);
  //   // Obtener conductores que no tienen días asignados (disponible todos los días).
  //   const conductoresSinDiaAsignado =
  //     await this.obtenerConductoresSinDiaAsignado();

  //   if (!dia) {
  //     // Si no se encuentra un día con ese nombre, retornamos solo los conductores sin día asignado.
  //     return conductoresSinDiaAsignado;
  //   }

  //   // Obtener los conductores que tienen el día especificado asignado.
  //   const conductoresConDiaAsignado =
  //     await this.obtenerConductoresConDiaAsignado(dia.nombre);

  //   const conductoresDisponibles = [
  //     ...conductoresSinDiaAsignado,
  //     ...conductoresConDiaAsignado,
  //   ];

  //   return conductoresDisponibles;
  // }

  // async obtenerConductoresSinDiaAsignado(): Promise<Conductor[]> {
  //   return await this.conductorRepository
  //     .createQueryBuilder('conductor')
  //     .leftJoinAndSelect('conductor.publicador', 'publicador')
  //     .leftJoinAndSelect('conductor.dias', 'dia')
  //     .where('dia.id IS NULL')
  //     .getMany();
  // }

  // async obtenerConductoresConDiaAsignado(dia: string): Promise<Conductor[]> {
  //   return await this.conductorRepository
  //     .createQueryBuilder('conductor')
  //     .leftJoinAndSelect('conductor.dias', 'dia')
  //     .leftJoinAndSelect('conductor.publicador', 'publicador')
  //     .where('dia.nombre = :nombreDia', { nombreDia: dia })
  //     .getMany();
  // }
}
