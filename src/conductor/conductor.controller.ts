import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Conductor } from './conductor.interface';
import { ConductorService } from './conductor.service';
import { CreateConductorDto } from 'src/database/dtos/conductor.dto';

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
  async createPublicador(
    @Body() conductorDto: CreateConductorDto,
  ): Promise<Conductor> {
    return this.conductorService.createConductor(conductorDto);
  }
}
