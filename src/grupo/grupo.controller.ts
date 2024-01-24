import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { GrupoService } from './grupo.service';
import { Grupo } from './grupo.interface';

@Controller('grupo')
export class GrupoController {
  constructor(private readonly grupoService: GrupoService) {}
  @Get()
  async getAll(): Promise<Grupo[]> {
    return await this.grupoService.obtenerGrupos();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.grupoService.buscarGrupo(id);
  }

  @Post()
  async createGrupo(@Body() grupo: Grupo): Promise<Grupo> {
    return this.grupoService.createGrupo(grupo);
  }
}
