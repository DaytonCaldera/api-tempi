import { Module } from '@nestjs/common';
import { TareasService } from './tareas.service';
import { TareasController } from './tareas.controller';
import { Tarea } from './entities/tarea.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicadorService } from 'src/publicador/publicador.service';
import { Publicador } from 'src/publicador/entities/publicador.entity';
import { Grupo } from 'src/grupo/entities/grupo.entity';
import { GrupoService } from 'src/grupo/grupo.service';
import { Congregacion } from 'src/congregacion/entities/congregacion.entity';
import { CongregacionService } from 'src/congregacion/congregacion.service';
import { Dia } from 'src/dia/entities/dia.entity';
import { DiaService } from 'src/dia/dia.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tarea, Publicador, Grupo, Congregacion, Dia]),
  ],
  controllers: [TareasController],
  providers: [
    TareasService,
    PublicadorService,
    GrupoService,
    CongregacionService,
    DiaService,
  ],
})
export class TareasModule {}
