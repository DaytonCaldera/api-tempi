import { Publicador } from './entities/publicador.entity';
import { Module } from '@nestjs/common';
import { PublicadorController } from './publicador.controller';
import { PublicadorService } from './publicador.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrupoService } from 'src/grupo/grupo.service';
import { Grupo } from 'src/grupo/entities/grupo.entity';
import { CongregacionService } from 'src/congregacion/congregacion.service';
import { Congregacion } from 'src/congregacion/entities/congregacion.entity';
import { Tarea } from 'src/tareas/entities/tarea.entity';
import { TareasService } from 'src/tareas/tareas.service';
import { DiaService } from 'src/dia/dia.service';
import { Dia } from 'src/dia/entities/dia.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Publicador, Grupo, Congregacion, Tarea, Dia]),
  ],
  controllers: [PublicadorController],
  providers: [
    PublicadorService,
    GrupoService,
    CongregacionService,
    TareasService,
    DiaService,
  ],
})
export class PublicadorModule {}
