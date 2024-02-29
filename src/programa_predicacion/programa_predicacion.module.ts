import { Module } from '@nestjs/common';
import { ProgramaPredicacionController } from './programa_predicacion.controller';
import { ProgramaPredicacionService } from './programa_predicacion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramaPredicacion } from 'src/programa_predicacion/entities/programa_predicacion.entity';
import { PuntosService } from 'src/puntos/puntos.service';
import { ConductorService } from 'src/conductor/conductor.service';
import { TerritorioService } from 'src/territorio/territorio.service';
import { Puntos } from 'src/puntos/entities/puntos.entity';
import { Conductor } from 'src/conductor/entities/conductor.entity';
import { Territorio } from 'src/territorio/entities/territorio.entity';
import { Dia } from 'src/dia/entities/dia.entity';
import { DiaService } from 'src/dia/dia.service';
import { Publicador } from 'src/publicador/entities/publicador.entity';
import { Grupo } from 'src/grupo/entities/grupo.entity';
import { PublicadorService } from 'src/publicador/publicador.service';
import { GrupoService } from 'src/grupo/grupo.service';
import { Fraccion } from 'src/fraccion/entities/fraccion.entity';
import { FraccionService } from 'src/fraccion/fraccion.service';
import { Modalidad } from 'src/modalidad/entities/modalidad.entity';
import { ModalidadService } from 'src/modalidad/modalidad.service';

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
      Modalidad,
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
    ModalidadService,
  ],
})
export class ProgramaPredicacionModule {}
