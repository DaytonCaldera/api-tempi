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

@Module({
  imports: [
    TypeOrmModule.forFeature([Conductor, Publicador, Dia, Grupo, Modalidad]),
  ],
  controllers: [ConductorController],
  providers: [
    ConductorService,
    PublicadorService,
    DiaService,
    GrupoService,
    ModalidadService,
  ],
})
export class ConductorModule {}
