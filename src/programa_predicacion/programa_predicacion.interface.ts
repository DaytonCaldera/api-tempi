import { Fraccion } from 'src/fraccion/fraccion.interface';
import { Modalidad } from 'src/modalidad/modalidad.interface';
import { Publicador } from 'src/publicador/entities/publicador.entity';
import { Puntos } from 'src/puntos/puntos.interface';
import { Territorio } from 'src/territorio/territorio.interface';

export interface ProgramaPredicacion {
  id: number;
  fecha: Date;
  punto: Puntos;
  conductor: Publicador;
  territorio?: Territorio[];
  fraccion?: Fraccion[];
  modalidad: Modalidad;
}
