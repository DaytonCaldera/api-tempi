import { Publicador } from './entities/publicador.entity';
import { Module } from '@nestjs/common';
import { PublicadorController } from './publicador.controller';
import { PublicadorService } from './publicador.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrupoService } from 'src/grupo/grupo.service';
import { Grupo } from 'src/grupo/entities/grupo.entity';
import { CongregacionService } from 'src/congregacion/congregacion.service';
import { Congregacion } from 'src/congregacion/entities/congregacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Publicador, Grupo, Congregacion])],
  controllers: [PublicadorController],
  providers: [PublicadorService, GrupoService, CongregacionService],
})
export class PublicadorModule {}
