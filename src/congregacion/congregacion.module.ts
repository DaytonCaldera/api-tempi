import { Module } from '@nestjs/common';
import { CongregacionService } from './congregacion.service';
import { CongregacionController } from './congregacion.controller';

@Module({
  controllers: [CongregacionController],
  providers: [CongregacionService],
})
export class CongregacionModule {}
