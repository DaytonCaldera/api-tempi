import { Module } from '@nestjs/common';
import { TerritorioController } from './territorio.controller';
import { TerritorioService } from './territorio.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Territorio } from 'src/territorio/entities/territorio.entity';
import { Fraccion } from 'src/fraccion/entities/fraccion.entity';
import { FraccionService } from 'src/fraccion/fraccion.service';
import { Puntos } from 'src/puntos/entities/puntos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Territorio, Fraccion, Puntos])],
  controllers: [TerritorioController],
  providers: [TerritorioService, FraccionService],
})
export class TerritorioModule {}
