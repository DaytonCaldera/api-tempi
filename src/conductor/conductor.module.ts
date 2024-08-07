import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conductor } from 'src/conductor/entities/conductor.entity';
import { ConductorController } from './conductor.controller';
import { ConductorService } from './conductor.service';

@Module({
  imports: [TypeOrmModule.forFeature([Conductor])],
  controllers: [ConductorController],
  providers: [ConductorService],
})
export class ConductorModule {}
