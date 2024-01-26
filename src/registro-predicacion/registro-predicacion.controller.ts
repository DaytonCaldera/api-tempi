import {
  Body,
  Controller,
  Get,
  NotImplementedException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { RegistroPredicacionService } from './registro-predicacion.service';
import { RegistroPredicacion } from './registro-predicacion.interface';
import { CreateRegistroPredicacionDto } from 'src/database/dtos/registro_predicacion.dto';
import { InsertResult } from 'typeorm';

@Controller('registro')
export class RegistroPredicacionController {
  constructor(private readonly registroService: RegistroPredicacionService) {}

  @Get()
  obtenerRegistros(): Promise<RegistroPredicacion[]> {
    return this.registroService.obtenerRegistros();
  }
  @Get(':id')
  buscarRegistro(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RegistroPredicacion> {
    return this.registroService.buscarRegistro(id);
  }
  @Post()
  guardarRegistro(
    @Body() registroDto: CreateRegistroPredicacionDto,
  ): Promise<InsertResult> {
    try {
      return this.registroService.guardarRegistro(registroDto);
    } catch (error) {
      console.log(error.code);

      throw new Error(error);
    }
  }
  @Patch()
  actualizarRegistro(): Promise<RegistroPredicacion> {
    throw new NotImplementedException();
  }
}
