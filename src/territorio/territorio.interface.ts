import { Fraccion } from 'src/fraccion/fraccion.interface';
import { Puntos } from 'src/puntos/puntos.interface';
import { RegistroPredicacion } from 'src/registro-predicacion/registro-predicacion.interface';

export interface Territorio {
  id: number;
  nombre: string;
  mapa: string;
  registro?: RegistroPredicacion;
  fraccion?: Fraccion;
  puntos?: Puntos[];
}
