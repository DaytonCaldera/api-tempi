import { Publicador } from 'src/publicador/entities/publicador.entity';

export interface Dia {
  id: number;
  nombre: string;
  conductores: Publicador[];
}
