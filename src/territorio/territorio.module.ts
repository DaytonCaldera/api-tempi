import { Module } from '@nestjs/common';
import { TerritorioController } from './territorio.controller';
import { TerritorioService } from './territorio.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Territorio } from 'src/territorio/entities/territorio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Territorio])],
  controllers: [TerritorioController],
  providers: [TerritorioService],
})
export class TerritorioModule {}
