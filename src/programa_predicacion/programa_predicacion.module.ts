import { Module } from '@nestjs/common';
import { ProgramaPredicacionController } from './programa_predicacion.controller';
import { ProgramaPredicacionService } from './programa_predicacion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramaPredicacion } from 'src/database/entities/programa_predicacion.entity';
import { PuntosService } from 'src/puntos/puntos.service';
import { ConductorService } from 'src/conductor/conductor.service';
import { TerritorioService } from 'src/territorio/territorio.service';
import { Puntos } from 'src/database/entities/puntos.entity';
import { Conductor } from 'src/database/entities/conductor.entity';
import { Territorio } from 'src/database/entities/territorio.entity';
import { Dia } from 'src/database/entities/dia.entity';
import { DiaService } from 'src/dia/dia.service';
import { Publicador } from 'src/database/entities/publicador.entity';
import { Grupo } from 'src/database/entities/grupo.entity';
import { PublicadorService } from 'src/publicador/publicador.service';
import { GrupoService } from 'src/grupo/grupo.service';
import { Fraccion } from 'src/database/entities/fraccion.entity';
import { FraccionService } from 'src/fraccion/fraccion.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProgramaPredicacion,
      Puntos,
      Conductor,
      Territorio,
      Dia,
      Publicador,
      Grupo,
      Fraccion,
    ]),
  ],
  controllers: [ProgramaPredicacionController],
  providers: [
    ProgramaPredicacionService,
    PuntosService,
    ConductorService,
    TerritorioService,
    DiaService,
    PublicadorService,
    GrupoService,
    FraccionService,
  ],
})
export class ProgramaPredicacionModule {}
