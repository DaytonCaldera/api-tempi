import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conductor } from 'src/database/entities/conductor.entity';
import { ConductorController } from './conductor.controller';
import { ConductorService } from './conductor.service';
import { PublicadorService } from 'src/publicador/publicador.service';
import { Publicador } from 'src/database/entities/publicador.entity';
import { Dia } from 'src/database/entities/dia.entity';
import { DiaService } from 'src/dia/dia.service';
import { GrupoService } from 'src/grupo/grupo.service';
import { Grupo } from 'src/database/entities/grupo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Conductor, Publicador, Dia, Grupo])],
  controllers: [ConductorController],
  providers: [ConductorService, PublicadorService, DiaService, GrupoService],
})
export class ConductorModule {}
