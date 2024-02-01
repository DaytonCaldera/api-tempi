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
import { FraccionModule } from 'src/fraccion/fraccion.module';
import { Fraccion } from 'src/database/entities/fraccion.entity';
import { RegistroPredicacionModule } from 'src/registro-predicacion/registro-predicacion.module';
import { RegistroPredicacion } from 'src/database/entities/registro_predicacion.entity';
import { PeriodoModule } from 'src/periodo/periodo.module';
import { Periodo } from 'src/database/entities/periodo.entity';
import { AuthModule } from './auth/auth.module';
import { ProgramaPredicacionModule } from 'src/programa_predicacion/programa_predicacion.module';
import { ProgramaPredicacion } from 'src/database/entities/programa_predicacion.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'predicacion',
      timezone: 'America/Costa_Rica',
      entities: [
        Grupo,
        Publicador,
        Conductor,
        Dia,
        Puntos,
        Territorio,
        Fraccion,
        Periodo,
        RegistroPredicacion,
        ProgramaPredicacion,
      ],
      synchronize: true,
      logging: true,
    }),
    GrupoModule,
    PublicadorModule,
    ConductorModule,
    DiaModule,
    PuntosModule,
    TerritorioModule,
    FraccionModule,
    PeriodoModule,
    RegistroPredicacionModule,
    ProgramaPredicacionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
