import { Publicador } from './../database/entities/publicador.entity';
import { Module } from '@nestjs/common';
import { PublicadorController } from './publicador.controller';
import { PublicadorService } from './publicador.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Publicador])],
  controllers: [PublicadorController],
  providers: [PublicadorService],
})
export class PublicadorModule {}
