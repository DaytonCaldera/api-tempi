import {
  Body,
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PeriodoService } from './periodo.service';
import { Periodo } from './periodo.interface';
import { CreatePeriodoDto } from 'src/periodo/dtos/periodo.dto';

@Controller('periodo')
export class PeriodoController {
  constructor(private readonly periodoService: PeriodoService) {}

  @Get()
  obtenerPeriodos(): Promise<Periodo[]> {
    return this.periodoService.obtenerPeriodos();
  }
  @Get(':id')
  buscarPeriodo(@Param(':id') id: number): Promise<Periodo> {
    return this.periodoService.buscarPeriodo(id);
  }
  @Post()
  guardarPeriodo(@Body() periodoDto: CreatePeriodoDto): Promise<Periodo> {
    return this.periodoService.guardarPeriodo(periodoDto);
  }
  @Patch()
  actualizarPeriodos(): Promise<Periodo> {
    throw new NotImplementedException();
  }
  @Delete(':id')
  eliminarPeriodo(@Param('id', ParseIntPipe) id: number) {
    return this.periodoService.eliminarPeriodo(id);
  }
}
