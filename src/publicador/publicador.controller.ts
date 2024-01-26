import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { PublicadorService } from './publicador.service';
import { Publicador } from './publicador.interface';
import { CreatePublicadorDto } from 'src/database/dtos/publicador.dto';

@Controller('publicador')
export class PublicadorController {
  constructor(private readonly publicadorService: PublicadorService) {}
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
}
