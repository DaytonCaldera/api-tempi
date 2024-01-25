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
import { FraccionService } from './fraccion.service';
import { Fraccion } from './fraccion.interface';
import { CreateFraccionDto } from 'src/database/dtos/fraccion.dto';

@Controller('fraccion')
export class FraccionController {
  constructor(private readonly fraccionService: FraccionService) {}

  @Get()
  obtenerFracciones(): Promise<Fraccion[]> {
    return this.fraccionService.obtenerFracciones();
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
  actualizarFraccion(): Promise<Fraccion> {
    throw new NotImplementedException();
  }
}
