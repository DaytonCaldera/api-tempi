import { Module } from '@nestjs/common';
import { PeriodoController } from './periodo.controller';
import { PeriodoService } from './periodo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Periodo } from 'src/database/entities/periodo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Periodo])],
  controllers: [PeriodoController],
  providers: [PeriodoService],
})
export class PeriodoModule {}
