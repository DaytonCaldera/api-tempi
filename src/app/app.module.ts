import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GrupoModule } from 'src/grupo/grupo.module';
import { PublicadorModule } from 'src/publicador/publicador.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grupo } from 'src/grupo/entities/grupo.entity';
import { Publicador } from 'src/publicador/entities/publicador.entity';
import { ConductorModule } from 'src/conductor/conductor.module';
import { Conductor } from 'src/conductor/entities/conductor.entity';
import { Dia } from 'src/dia/entities/dia.entity';
import { DiaModule } from 'src/dia/dia.module';
import { PuntosModule } from 'src/puntos/puntos.module';
import { Puntos } from 'src/puntos/entities/puntos.entity';
import { TerritorioModule } from 'src/territorio/territorio.module';
import { Territorio } from 'src/territorio/entities/territorio.entity';
import { FraccionModule } from 'src/fraccion/fraccion.module';
import { Fraccion } from 'src/fraccion/entities/fraccion.entity';
import { RegistroPredicacionModule } from 'src/registro-predicacion/registro-predicacion.module';
import { RegistroPredicacion } from 'src/registro-predicacion/entities/registro_predicacion.entity';
import { PeriodoModule } from 'src/periodo/periodo.module';
import { Periodo } from 'src/periodo/entities/periodo.entity';
import { AuthModule } from './auth/auth.module';
import { ProgramaPredicacionModule } from 'src/programa_predicacion/programa_predicacion.module';
import { ProgramaPredicacion } from 'src/programa_predicacion/entities/programa_predicacion.entity';
import { Modalidad } from 'src/modalidad/entities/modalidad.entity';
import { ModalidaModule } from 'src/modalidad/modalidad.module';
import { ConfiguracionModule } from 'src/configuracion/configuracion.module';
import { Configuracion } from 'src/configuracion/entities/configuracion.entity';
import { Horario } from 'src/horario/entities/horario.entity';
import { HorarioModule } from 'src/horario/horario.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      database: process.env.DATABASE_NAME,
      timezone: process.env.DEFAULT_TIMEZONE,
      entities: [
        Configuracion,
        Horario,
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
        Modalidad,
      ],
      synchronize: true,
      logging: true,
    }),
    ConfiguracionModule,
    HorarioModule,
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
    ModalidaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
