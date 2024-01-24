import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { GrupoController } from './grupo.controller';
import { GrupoService } from './grupo.service';
import { LoggerMiddleware } from 'src/app/middleware/logger/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grupo } from '../database/entities/grupo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Grupo])],
  controllers: [GrupoController],
  providers: [GrupoService],
})
export class GrupoModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        { path: 'grupo', method: RequestMethod.GET },
        { path: 'grupo/buscar', method: RequestMethod.POST },
      );
  }
}
