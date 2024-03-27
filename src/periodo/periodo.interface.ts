import { RegistroPredicacion } from 'src/registro-predicacion/registro-predicacion.interface';

export interface Periodo {
  id: number;
  inicio?: Date;
  final?: Date;
  registros: RegistroPredicacion[];
}
