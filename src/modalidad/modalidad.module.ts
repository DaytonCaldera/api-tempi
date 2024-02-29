import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modalidad } from './entities/modalidad.entity';
import { ModalidadService } from './modalidad.service';
import { ModalidadController } from './modalidad.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Modalidad])],
  controllers: [ModalidadController],
  providers: [ModalidadService],
})
export class ModalidaModule {}
