import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { RegistroPredicacionService } from './registro-predicacion.service';
import { RegistroPredicacion } from './registro-predicacion.interface';
import {
  CreateRegistroPredicacionDto,
  UpdateRegistroPredicacionDto,
} from 'src/registro-predicacion/dtos/registro_predicacion.dto';

@Controller('registro')
export class RegistroPredicacionController {
  constructor(private readonly registroService: RegistroPredicacionService) {}

  @Get()
  obtenerRegistros(): Promise<RegistroPredicacion[]> {
    return this.registroService.obtenerRegistros();
  }
  @Get('/tabla')
  obtenerRegistroTabla(): Promise<RegistroPredicacion[]> {
    return this.registroService.obtenerRegistroTabla();
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
  ): Promise<RegistroPredicacion> {
    try {
      return this.registroService.guardarRegistro(registroDto);
    } catch (error) {
      console.log(error.code);

      throw new Error(error);
    }
  }
  @Patch()
  actualizarRegistro(
    @Body() registroDto: UpdateRegistroPredicacionDto,
  ): Promise<RegistroPredicacion> {
    try {
      return this.registroService.actualizarRegistro(registroDto);
    } catch (error) {
      console.log(error.code);

      throw new Error(error);
    }
  }
}
