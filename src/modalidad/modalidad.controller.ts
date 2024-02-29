import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { Modalidad } from './modalidad.interface';
import { ModalidadService } from './modalidad.service';
import { CreateModalidadDto, UpdateModalidadDto } from './dtos/modalidad.dto';

@Controller('modalidad')
export class ModalidadController {
  constructor(private readonly modalidadService: ModalidadService) {}

  @Get()
  obtenerDias(): Promise<Modalidad[]> {
    return this.modalidadService.obtenerDias();
  }

  @Post()
  guardarModalidad(@Body() modalidad: CreateModalidadDto): Promise<Modalidad> {
    return this.modalidadService.guardarModalidad(modalidad);
  }
  @Patch()
  actualizarModalidad(
    @Body() modalidad: UpdateModalidadDto,
  ): Promise<Modalidad> {
    return this.modalidadService.actualizarModalidad(modalidad);
  }
  @Delete(':id')
  borrarModalidad(@Param('id',ParseIntPipe) id: number){
    return this.modalidadService.borrarModalidad(id);
  }
}
