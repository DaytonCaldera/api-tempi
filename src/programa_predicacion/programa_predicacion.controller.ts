import { DeleteProgramaPredicacionDto } from './dtos/programa_predicacion.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  BusquedaFechasDto,
  CreateProgramaPredicacionDto,
  GenerarProgramDto,
  TablaProgramaDto,
  UpdateProgramaPredicacionDto,
} from 'src/programa_predicacion/dtos/programa_predicacion.dto';
import { ProgramaPredicacionService } from './programa_predicacion.service';
import { ProgramaPredicacion } from './programa_predicacion.interface';

@Controller('programa')
export class ProgramaPredicacionController {
  constructor(private readonly programaService: ProgramaPredicacionService) {}
  @Get()
  obtenerPrograma(): Promise<ProgramaPredicacion[]> {
    return this.programaService.obtenerPrograma();
  }

  @Get('/generar')
  generarProgramaEntreFechas(
    @Body() fechasProgramasDto: GenerarProgramDto,
  ): Promise<any> {
    console.log(fechasProgramasDto);
    return null;
  }

  @Get('/tabla')
  obtenerProgramaTabla(
    @Query('fecha_inicio') fecha_inicio?: Date,
    @Query('fecha_final') fecha_final?: Date,
    @Query('generar', new ParseBoolPipe({ optional: true })) generar?: boolean,
  ): Promise<TablaProgramaDto[]> {
    const fechasDto = new BusquedaFechasDto(fecha_inicio, fecha_final, generar);
    return this.programaService.obtenerProgramaTabla(fechasDto);
  }

  @Get(':id')
  buscarPrograma(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProgramaPredicacion> {
    return this.programaService.buscarPrograma(id);
  }

  @Post()
  guardarPrograma(
    @Body() programaDto: CreateProgramaPredicacionDto,
  ): Promise<ProgramaPredicacion> {
    return this.programaService.guardarPrograma(programaDto);
  }

  @Patch()
  actualizarPrograma(
    @Body() programaDto: UpdateProgramaPredicacionDto,
  ): Promise<ProgramaPredicacion> {
    return this.programaService.actualizarPrograma(programaDto);
  }

  @Delete()
  eliminarPrograma(@Body() programaDto: DeleteProgramaPredicacionDto) {
    return this.programaService.eliminarPrograma(programaDto.id);
  }
}
