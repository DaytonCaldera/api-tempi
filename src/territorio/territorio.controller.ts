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
import { TerritorioService } from './territorio.service';
import { Territorio } from './territorio.interface';

@Controller('territorio')
export class TerritorioController {
  constructor(private territorioService: TerritorioService) {}
  @Get()
  obtenerTerritorios(): Promise<Territorio[]> {
    return this.territorioService.obtenerTerritorios();
  }
  @Get(':id')
  buscarTerritorio(@Param('id', ParseIntPipe) id: number): Promise<Territorio> {
    return this.territorioService.buscarTerritorio(id);
  }
  @Post()
  guardarTerritorio(@Body() territorio: Territorio): Promise<Territorio> {
    return this.territorioService.guardarTerritorio(territorio);
  }
  @Patch()
  actualizarTerritorio(): Promise<Territorio> {
    throw new NotImplementedException();
  }
}
