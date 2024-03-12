import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { TerritorioService } from './territorio.service';
import { Territorio } from './territorio.interface';
import {
  CreateTerritorioDto,
  TablaTerritoriosDto,
  UpdateTerritorioDto,
} from './dtos/territorio.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('territorio')
export class TerritorioController {
  constructor(private territorioService: TerritorioService) {}
  @Get()
  obtenerTerritorios(): Promise<Territorio[]> {
    return this.territorioService.obtenerTerritorios();
  }
  @Get('/tabla')
  async obtenerTablaTerritorios(): Promise<TablaTerritoriosDto[]> {
    return this.territorioService.obtenerTablaTerritorios();
  }
  @Get(':id')
  buscarTerritorio(@Param('id', ParseIntPipe) id: number): Promise<Territorio> {
    return this.territorioService.buscarTerritorio(id);
  }
  // @Post()
  // guardarTerritorio(@Body() territorio: Territorio): Promise<Territorio> {
  //   return this.territorioService.guardarTerritorio(territorio);
  // }
  @Post('')
  @UseInterceptors(FileInterceptor('mapa'))
  async subirArchivoPrueba(
    @UploadedFile() mapa,
    @Body() territorioDto: CreateTerritorioDto,
  ) {
    // console.log('Nombre: ', body.nombre);
    // console.log('Mapa: ', typeof mapa);
    return this.territorioService.guardarTerritorio(territorioDto, mapa);
  }
  @Patch()
  actualizarTerritorio(
    @Body() territorioDto: UpdateTerritorioDto,
  ): Promise<Territorio> {
    return this.territorioService.actualizarTerritorio(territorioDto);
  }
}
