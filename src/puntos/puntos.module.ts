import { Module } from '@nestjs/common';
import { PuntosController } from './puntos.controller';
import { PuntosService } from './puntos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Puntos } from 'src/puntos/entities/puntos.entity';
import { DiaService } from 'src/dia/dia.service';
import { Dia } from 'src/dia/entities/dia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Puntos, Dia])],
  controllers: [PuntosController],
  providers: [PuntosService, DiaService],
})
export class PuntosModule {}
