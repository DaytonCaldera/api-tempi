import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GrupoService } from './grupo.service';
import { Grupo } from './grupo.interface';
import { JwtAuthGuard } from 'src/app/auth/guards/jwt-auth.guard';
import { CreateGrupoDto, TablaGrupoDto, UpdateGrupoDto } from 'src/database/dtos/grupo.dto';

@Controller('grupo')
export class GrupoController {
  constructor(private readonly grupoService: GrupoService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll(): Promise<Grupo[]> {
    return this.grupoService.obtenerGrupos();
  }
  @Get('tabla')
  obtenerTablaGrupos(): Promise<TablaGrupoDto[]> {
    return this.grupoService.obtenerTablaGrupos();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.grupoService.buscarGrupo(id);
  }

  @Post()
  async createGrupo(@Body() grupoDto: CreateGrupoDto): Promise<Grupo> {
    return this.grupoService.createGrupo(grupoDto);
  }

  @Patch()
  async updateGrupo(@Body() grupoDto: UpdateGrupoDto): Promise<Grupo> {
    return this.grupoService.updateGrupo(grupoDto);
  }

  @Delete(':id')
  async deleteGrupo(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.grupoService.deleteGrupo(id);
  }
}
