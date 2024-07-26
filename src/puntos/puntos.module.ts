import { Module } from '@nestjs/common';
import { PuntosController } from './puntos.controller';
import { PuntosService } from './puntos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Puntos } from 'src/puntos/entities/puntos.entity';
import { DiaService } from 'src/dia/dia.service';
import { Dia } from 'src/dia/entities/dia.entity';
import { Territorio } from 'src/territorio/entities/territorio.entity';
import { FraccionService } from 'src/fraccion/fraccion.service';
import { Fraccion } from 'src/fraccion/entities/fraccion.entity';
import { TerritorioService } from 'src/territorio/territorio.service';

@Module({
  imports: [TypeOrmModule.forFeature([Puntos, Dia, Territorio, Fraccion])],
  controllers: [PuntosController],
  providers: [PuntosService, DiaService, FraccionService, TerritorioService],
})
export class PuntosModule {}
