import { Module } from '@nestjs/common';
import { GrupoController } from './grupo.controller';
import { GrupoService } from './grupo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grupo } from './entities/grupo.entity';
import { Publicador } from 'src/publicador/entities/publicador.entity';
import { PublicadorService } from 'src/publicador/publicador.service';

@Module({
  imports: [TypeOrmModule.forFeature([Grupo, Publicador])],
  controllers: [GrupoController],
  providers: [GrupoService, PublicadorService],
})
export class GrupoModule {}
