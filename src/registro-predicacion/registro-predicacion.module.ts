import { Module } from '@nestjs/common';
import { RegistroPredicacionController } from './registro-predicacion.controller';
import { RegistroPredicacionService } from './registro-predicacion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistroPredicacion } from 'src/database/entities/registro_predicacion.entity';
import { TerritorioService } from 'src/territorio/territorio.service';
import { Territorio } from 'src/database/entities/territorio.entity';
import { ConductorService } from 'src/conductor/conductor.service';
import { Conductor } from 'src/database/entities/conductor.entity';
import { PublicadorService } from 'src/publicador/publicador.service';
import { Publicador } from 'src/database/entities/publicador.entity';
import { DiaService } from 'src/dia/dia.service';
import { Dia } from 'src/database/entities/dia.entity';
import { Grupo } from 'src/database/entities/grupo.entity';
import { GrupoService } from 'src/grupo/grupo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RegistroPredicacion,
      Territorio,
      Conductor,
      Publicador,
      Grupo,
      Dia,
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
  ],
})
export class RegistroPredicacionModule {}
