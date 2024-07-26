import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { FraccionService } from './fraccion.service';
import { Fraccion } from './fraccion.interface';
import {
  CreateFraccionDto,
  FraccionDrowdownDto,
  UpdateFraccionDto,
} from 'src/fraccion/dtos/fraccion.dto';

@Controller('fraccion')
export class FraccionController {
  constructor(private readonly fraccionService: FraccionService) {}

  @Get()
  obtenerFracciones(): Promise<Fraccion[]> {
    return this.fraccionService.obtenerFracciones();
  }
  @Get('/dropdown')
  obtenerDrowdownFracciones(): Promise<FraccionDrowdownDto[]> {
    return this.fraccionService.obtenerDrowdownFracciones();
  }
  @Get(':id')
  buscarFraccion(@Param('id', ParseIntPipe) id: number): Promise<Fraccion> {
    return this.fraccionService.buscarFraccion(id);
  }
  @Post()
  guardarFraccion(@Body() fraccionDto: CreateFraccionDto): Promise<Fraccion> {
    return this.fraccionService.guardarFraccion(fraccionDto);
  }
  @Patch()
  actualizarFraccion(
    @Body() fraccionDto: UpdateFraccionDto,
  ): Promise<Fraccion> {
    return this.fraccionService.actualizarFraccion(fraccionDto);
  }
}
