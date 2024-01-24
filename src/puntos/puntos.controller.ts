import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PuntosService } from './puntos.service';
import { Puntos } from './puntos.interface';
import { CreatePuntoDto, UpdatePuntoDto } from 'src/database/dtos/puntos.dto';

@Controller('puntos')
export class PuntosController {
  constructor(private readonly puntosService: PuntosService) {}
  @Get()
  obtenerPuntos(): Promise<Puntos[]> {
    return this.puntosService.obtenerPuntos();
  }
  @Get(':id')
  buscarPunto(@Param('id', ParseIntPipe) id: number): Promise<Puntos> {
    return this.puntosService.buscarPunto(id);
  }
  @Post()
  crearPunto(@Body() puntoDto: CreatePuntoDto): Promise<Puntos> {
    return this.puntosService.crearPunto(puntoDto);
  }
  @Patch()
  actualizarPunto(@Body() puntoDto: UpdatePuntoDto): Promise<Puntos> {
    return this.puntosService.actualizarPunto(puntoDto);
  }
}
