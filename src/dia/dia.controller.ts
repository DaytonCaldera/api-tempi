import { Body, Controller, Get, Post } from '@nestjs/common';
import { DiaService } from './dia.service';
import { Dia } from './dia.interface';

@Controller('dia')
export class DiaController {
  constructor(private readonly diaService: DiaService) {}

  @Get()
  obtenerDias(): Promise<Dia[]> {
    return this.diaService.obtenerDias();
  }

  @Post()
  guardarDia(@Body() dia: Dia): Promise<Dia> {
    return this.diaService.guardarDia(dia);
  }
}
