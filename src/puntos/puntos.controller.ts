import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PuntosService } from './puntos.service';
import { Puntos } from './puntos.interface';
import {
  CreatePuntoDto,
  TablaPuntosDto,
  UpdatePuntoDto,
} from 'src/puntos/dtos/puntos.dto';

@Controller('puntos')
export class PuntosController {
  constructor(private readonly puntosService: PuntosService) {}
  @Get()
  obtenerPuntos(): Promise<Puntos[]> {
    return this.puntosService.obtenerPuntos();
  }
  @Get('/tabla')
  async obtenerTablaTerritorios(): Promise<TablaPuntosDto[]> {
    return this.puntosService.obtenerTablaTerritorios();
  }
  @Get('/territorio')
  buscarPuntoPorTerritorios(
    @Query('t') territorios?: string,
    @Query('f') fracciones?: string,
  ) {
    if (!territorios && !fracciones)
      throw new BadRequestException(
        null,
        'Faltan algunos parametros: {territorios, fracciones}',
      );
    const territoriosIds = territorios.split(',');
    const fraccionesIds = fracciones.split(',');

    return this.puntosService.buscarPuntoPorTerritorios(
      territoriosIds,
      fraccionesIds,
    );
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
  @Delete()
  eliminarPunto(@Param('id', ParseIntPipe) id: number) {
    return this.puntosService.eliminarPunto(id);
  }
}
