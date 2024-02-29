import { Body, Controller, Get, Post } from '@nestjs/common';
import { Modalidad } from './modalidad.interface';
import { ModalidadService } from './modalidad.service';

@Controller('modalidad')
export class ModalidadController {
  constructor(private readonly modalidadService: ModalidadService) {}

  @Get()
  obtenerDias(): Promise<Modalidad[]> {
    return this.modalidadService.obtenerDias();
  }

  @Post()
  guardarModalidad(@Body() modalidad: Modalidad): Promise<Modalidad> {
    return this.modalidadService.guardarModalidad(modalidad);
  }
}
