import { ComboConductor, TablaConductorDto } from './dtos/conductor.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Conductor } from './conductor.interface';
import { ConductorService } from './conductor.service';
import {
  CreateConductorDto,
  UpdateConductorDto,
} from 'src/conductor/dtos/conductor.dto';

@Controller('conductor')
export class ConductorController {
  constructor(private readonly conductorService: ConductorService) {}
  // @Get()
  // obtenerConductores(): Promise<Conductor[]> {
  //   return this.conductorService.obtenerConductores();
  // }

  // @Get('/tabla')
  // obtenerTablaConductores(): Promise<TablaConductorDto[]> {
  //   return this.conductorService.obtenerTablaConductores();
  // }

  // @Get('/programa')
  // obtenerConductoresDisponibles(
  //   @Query('fecha') fecha: string,
  // ): Promise<ComboConductor[]> {
  //   return this.conductorService.obtenerConductoresComboDisponibles(fecha);
  //   throw new NotFoundException();
  // }

  // @Get(':id')
  // obtenerConductor(@Param('id', ParseIntPipe) id): Promise<Conductor> {
  //   // return this.conductorService.buscarConductor(id);
  // }

  // @Post()
  // async createConductor(
  //   @Body() conductorDto: CreateConductorDto,
  // ): Promise<Conductor> {
  //   return this.conductorService.createConductor(conductorDto);
  // }

  // @Patch()
  // async updateConductor(
  //   @Body() conductorDto: UpdateConductorDto,
  // ): Promise<Conductor> {
  //   return this.conductorService.updateConductor(conductorDto);
  // }

  // @Delete(':id')
  // deleteConductor(@Param('id', ParseIntPipe) id: number) {
  //   return this.conductorService.deleteConductor(id);
  // }
}
