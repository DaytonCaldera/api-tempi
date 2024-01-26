import { Publicador } from './../database/entities/publicador.entity';
import { Module } from '@nestjs/common';
import { PublicadorController } from './publicador.controller';
import { PublicadorService } from './publicador.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrupoService } from 'src/grupo/grupo.service';
import { Grupo } from 'src/database/entities/grupo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Publicador, Grupo])],
  controllers: [PublicadorController],
  providers: [PublicadorService, GrupoService],
})
export class PublicadorModule {}
