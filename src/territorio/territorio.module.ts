import { Module } from '@nestjs/common';
import { TerritorioController } from './territorio.controller';
import { TerritorioService } from './territorio.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Territorio } from 'src/territorio/entities/territorio.entity';
import { Fraccion } from 'src/fraccion/entities/fraccion.entity';
import { FraccionService } from 'src/fraccion/fraccion.service';
import { Puntos } from 'src/puntos/entities/puntos.entity';
import { Congregacion } from 'src/congregacion/entities/congregacion.entity';
import { CongregacionService } from 'src/congregacion/congregacion.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Territorio, Fraccion, Puntos, Congregacion]),
  ],
  controllers: [TerritorioController],
  providers: [TerritorioService, FraccionService, CongregacionService],
})
export class TerritorioModule {}
