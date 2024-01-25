import { Territorio } from 'src/territorio/territorio.interface';

export interface Fraccion {
  id: number;
  territorio: Territorio;
  iniciado: Date;
  programado?: Date;
  notas?: string;
}
