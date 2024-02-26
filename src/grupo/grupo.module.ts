import { Module } from '@nestjs/common';
import { GrupoController } from './grupo.controller';
import { GrupoService } from './grupo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grupo } from '../database/entities/grupo.entity';
import { Publicador } from 'src/database/entities/publicador.entity';
import { PublicadorService } from 'src/publicador/publicador.service';

@Module({
  imports: [TypeOrmModule.forFeature([Grupo, Publicador])],
  controllers: [GrupoController],
  providers: [GrupoService, PublicadorService],
})
export class GrupoModule {}
