import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GrupoService } from './grupo.service';
import { Grupo } from './grupo.interface';
import { JwtAuthGuard } from 'src/app/auth/guards/jwt-auth.guard';

@Controller('grupo')
export class GrupoController {
  constructor(private readonly grupoService: GrupoService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
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

  @Delete(':id')
  async deleteGrupo(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.grupoService.deleteGrupo(id);
  }
}
