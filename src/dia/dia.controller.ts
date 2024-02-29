import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
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
  @Patch()
  actualizarDia(@Body() dia: Dia): Promise<Dia> {
    return this.diaService.actualizarDia(dia);
  }
  @Delete(':id')
  borrarDia(@Param('id', ParseIntPipe) id: number) {
    return this.diaService.borrarDia(id);
  }
}
