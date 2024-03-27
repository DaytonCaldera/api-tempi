import { Module } from '@nestjs/common';
import { RegistroPredicacionController } from './registro-predicacion.controller';
import { RegistroPredicacionService } from './registro-predicacion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistroPredicacion } from 'src/registro-predicacion/entities/registro_predicacion.entity';
import { TerritorioService } from 'src/territorio/territorio.service';
import { Territorio } from 'src/territorio/entities/territorio.entity';
import { ConductorService } from 'src/conductor/conductor.service';
import { Conductor } from 'src/conductor/entities/conductor.entity';
import { PublicadorService } from 'src/publicador/publicador.service';
import { Publicador } from 'src/publicador/entities/publicador.entity';
import { DiaService } from 'src/dia/dia.service';
import { Dia } from 'src/dia/entities/dia.entity';
import { Grupo } from 'src/grupo/entities/grupo.entity';
import { GrupoService } from 'src/grupo/grupo.service';
import { Modalidad } from 'src/modalidad/entities/modalidad.entity';
import { ModalidadService } from 'src/modalidad/modalidad.service';
import { Fraccion } from 'src/fraccion/entities/fraccion.entity';
import { Periodo } from 'src/periodo/entities/periodo.entity';
import { PeriodoService } from 'src/periodo/periodo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RegistroPredicacion,
      Territorio,
      Conductor,
      Publicador,
      Grupo,
      Dia,
      Modalidad,
      Fraccion,
      Periodo,
    ]),
  ],
  controllers: [RegistroPredicacionController],
  providers: [
    RegistroPredicacionService,
    TerritorioService,
    ConductorService,
    PublicadorService,
    DiaService,
    GrupoService,
    ModalidadService,
    PeriodoService,
  ],
})
export class RegistroPredicacionModule {}
