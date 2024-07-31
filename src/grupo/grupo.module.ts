import { Module } from '@nestjs/common';
import { GrupoController } from './grupo.controller';
import { GrupoService } from './grupo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grupo } from './entities/grupo.entity';
import { Publicador } from 'src/publicador/entities/publicador.entity';
import { CongregacionService } from 'src/congregacion/congregacion.service';
import { Congregacion } from 'src/congregacion/entities/congregacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Congregacion, Grupo, Publicador])],
  controllers: [GrupoController],
  providers: [GrupoService, CongregacionService],
})
export class GrupoModule {}
