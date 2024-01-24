import { Module } from '@nestjs/common';
import { DiaController } from './dia.controller';
import { DiaService } from './dia.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dia } from 'src/database/entities/dia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dia])],
  controllers: [DiaController],
  providers: [DiaService],
})
export class DiaModule {}
