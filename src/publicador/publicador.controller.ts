import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PublicadorService } from './publicador.service';
import { Publicador } from './publicador.interface';
import {
  CreatePublicadorDto,
  TablaPublicadorDto,
  UpdatePublicadorDto,
} from 'src/publicador/dtos/publicador.dto';

@Controller('publicador')
export class PublicadorController {
  constructor(private readonly publicadorService: PublicadorService) { }
  @Get()
  async getAll(): Promise<Publicador[]> {
    try {
      return await this.publicadorService.obtenerPublicadores();
    } catch (error) {
      throw new HttpException(
        'No se encontraron publicadores',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Get('/tabla')
  async obtenerTablaPublicadores(): Promise<TablaPublicadorDto[]> {
    return this.publicadorService.obtenerTablaPublicadores();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.publicadorService.buscarPublicadorID(id);
  }

  @Post()
  async createPublicador(
    @Body() publicadorDto: CreatePublicadorDto,
  ): Promise<Publicador> {
    return this.publicadorService.createPublicador(publicadorDto);
  }

  @Patch()
  async updatePublicador(
    @Body() publicadorDto: UpdatePublicadorDto,
  ): Promise<Publicador> {
    return this.publicadorService.updatePublicador(publicadorDto);
  }

  @Delete(':id')
  async eliminarPublicador(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    return this.publicadorService.deletePublicador(id);
  }
}
