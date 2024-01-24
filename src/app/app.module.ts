import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GrupoModule } from 'src/grupo/grupo.module';
import { PublicadorModule } from 'src/publicador/publicador.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grupo } from 'src/database/entities/grupo.entity';
import { Publicador } from 'src/database/entities/publicador.entity';
import { ConductorModule } from 'src/conductor/conductor.module';
import { Conductor } from 'src/database/entities/conductor.entity';
import { Dia } from 'src/database/entities/dia.entity';
import { DiaModule } from 'src/dia/dia.module';
import { PuntosModule } from 'src/puntos/puntos.module';
import { Puntos } from 'src/database/entities/puntos.entity';
import { TerritorioModule } from 'src/territorio/territorio.module';
import { Territorio } from 'src/database/entities/territorio.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'predicacion',
      entities: [Grupo, Publicador, Conductor, Dia, Puntos, Territorio],
      synchronize: true,
    }),
    GrupoModule,
    PublicadorModule,
    ConductorModule,
    DiaModule,
    PuntosModule,
    TerritorioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
