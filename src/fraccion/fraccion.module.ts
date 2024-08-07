import { Module } from '@nestjs/common';
import { FraccionController } from './fraccion.controller';
import { FraccionService } from './fraccion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fraccion } from 'src/fraccion/entities/fraccion.entity';
import { Territorio } from 'src/territorio/entities/territorio.entity';
import { TerritorioService } from 'src/territorio/territorio.service';
import { CongregacionService } from 'src/congregacion/congregacion.service';
import { Congregacion } from 'src/congregacion/entities/congregacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fraccion, Territorio, Congregacion])],
  controllers: [FraccionController],
  providers: [FraccionService, TerritorioService, CongregacionService],
})
export class FraccionModule {}
