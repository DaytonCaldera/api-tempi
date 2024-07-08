import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfiguracionController } from './configuracion.controller';
import { Configuracion } from './entities/configuracion.entity';
import { ConfiguracionService } from './configuracion.service';
import { Dia } from 'src/dia/entities/dia.entity';
import { DiaService } from 'src/dia/dia.service';

@Module({
  imports: [TypeOrmModule.forFeature([Configuracion, Dia])],
  controllers: [ConfiguracionController],
  providers: [ConfiguracionService, DiaService],
})
export class ConfiguracionModule {}
