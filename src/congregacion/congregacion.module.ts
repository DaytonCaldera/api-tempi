import { Module } from '@nestjs/common';
import { CongregacionService } from './congregacion.service';
import { CongregacionController } from './congregacion.controller';
import { Congregacion } from './entities/congregacion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Congregacion])],
  controllers: [CongregacionController],
  providers: [CongregacionService],
})
export class CongregacionModule {}
