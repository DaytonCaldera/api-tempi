import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  CreateProgramaPredicacionDto,
  UpdateProgramaPredicacionDto,
} from 'src/database/dtos/programa_predicacion.dto';
import { ProgramaPredicacionService } from './programa_predicacion.service';
import { ProgramaPredicacion } from './programa_predicacion.interface';

@Controller('programa')
export class ProgramaPredicacionController {
  constructor(private readonly programaService: ProgramaPredicacionService) {}
  @Get()
  obtenerPrograma(): Promise<ProgramaPredicacion[]> {
    return this.programaService.obtenerPrograma();
  }

  @Get(':id')
  buscarPrograma(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProgramaPredicacion> {
    return this.programaService.buscarPrograma(id);
  }

  @Post()
  guardarPrograma(
    @Body() programaDto: CreateProgramaPredicacionDto,
  ): Promise<ProgramaPredicacion> {
    return this.programaService.guardarPrograma(programaDto);
  }

  @Patch()
  actualizarPrograma(
    @Body() programaDto: UpdateProgramaPredicacionDto,
  ): Promise<ProgramaPredicacion> {
    return this.programaService.actualizarPrograma(programaDto);
  }
}
