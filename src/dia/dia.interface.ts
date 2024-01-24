import { Conductor } from 'src/conductor/conductor.interface';

export interface Dia {
  id: number;
  nombre: string;
  conductores: Conductor[];
}
