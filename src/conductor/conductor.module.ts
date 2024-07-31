import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conductor } from 'src/conductor/entities/conductor.entity';
import { ConductorController } from './conductor.controller';
import { ConductorService } from './conductor.service';
import { PublicadorService } from 'src/publicador/publicador.service';
import { Publicador } from 'src/publicador/entities/publicador.entity';
import { Dia } from 'src/dia/entities/dia.entity';
import { DiaService } from 'src/dia/dia.service';
import { GrupoService } from 'src/grupo/grupo.service';
import { Grupo } from 'src/grupo/entities/grupo.entity';
import { Modalidad } from 'src/modalidad/entities/modalidad.entity';
import { ModalidadService } from 'src/modalidad/modalidad.service';
import { CongregacionService } from 'src/congregacion/congregacion.service';
import { Congregacion } from 'src/congregacion/entities/congregacion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Conductor,
      Publicador,
      Dia,
      Grupo,
      Modalidad,
      Congregacion,
    ]),
  ],
  controllers: [ConductorController],
  providers: [
    CongregacionService,
    ConductorService,
    PublicadorService,
    DiaService,
    GrupoService,
    ModalidadService,
  ],
})
export class ConductorModule {}
