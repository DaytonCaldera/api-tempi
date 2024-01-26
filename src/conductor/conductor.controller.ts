import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Conductor } from './conductor.interface';
import { ConductorService } from './conductor.service';
import {
  CreateConductorDto,
  UpdateConductorDto,
} from 'src/database/dtos/conductor.dto';

@Controller('conductor')
export class ConductorController {
  constructor(private readonly conductorService: ConductorService) {}
  @Get()
  obtenerConductores(): Promise<Conductor[]> {
    return this.conductorService.obtenerConductores();
  }

  @Get(':id')
  obtenerConductor(@Param('id', ParseIntPipe) id): Promise<Conductor> {
    return this.conductorService.buscarConductor(id);
  }

  @Post()
  async createConductor(
    @Body() conductorDto: CreateConductorDto,
  ): Promise<Conductor> {
    return this.conductorService.createConductor(conductorDto);
  }

  @Patch()
  async updateConductor(
    @Body() conductorDto: UpdateConductorDto,
  ): Promise<Conductor> {
    return this.conductorService.updateConductor(conductorDto);
  }
}
