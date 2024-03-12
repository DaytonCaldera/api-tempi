import { Dia } from 'src/dia/dia.interface';
import { Grupo } from 'src/grupo/grupo.interface';
import { Territorio } from 'src/territorio/territorio.interface';

export class CreatePuntoDto {
  nombre: string;
  dias: number[];
  grupo?: number;
  territorios?: Territorio[];
}

export class UpdatePuntoDto {
  id: number;
  nombre?: string;
  dias?: number[];
  territorios?: number[];
  grupo?: number;
}

export class TablaPuntosDto {
  id: number;
  nombre: string;
  dias?: Dia[];
  territorios?: Territorio[];
  grupo?: Grupo;
}
