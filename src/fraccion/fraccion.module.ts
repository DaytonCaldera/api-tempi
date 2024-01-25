import { Module } from '@nestjs/common';
import { FraccionController } from './fraccion.controller';
import { FraccionService } from './fraccion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fraccion } from 'src/database/entities/fraccion.entity';
import { Territorio } from 'src/database/entities/territorio.entity';
import { TerritorioService } from 'src/territorio/territorio.service';

@Module({
  imports: [TypeOrmModule.forFeature([Fraccion, Territorio])],
  controllers: [FraccionController],
  providers: [FraccionService, TerritorioService],
})
export class FraccionModule {}
