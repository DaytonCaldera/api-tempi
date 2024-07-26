import { Dia } from 'src/dia/dia.interface';
import { Modalidad } from 'src/modalidad/entities/modalidad.entity';
import { Publicador } from 'src/publicador/publicador.interface';

export class CreateConductorDto {
  publicadorId: number;
  dias: number[];
  modalidad: number[]; // 1 - presencial, 2 - videoconferencia
}

export class UpdateConductorDto {
  id: number;
  publicadorId: number;
  dias?: number[];
  modalidad?: number[]; // 1 - presencial, 2 - videoconferencia
}

export class TablaConductorDto {
  id: number;
  nombre_conductor: string;
  publicador: Publicador;
  dias: Dia[];
  modalidad?: Modalidad[]; // 1 - presencial, 2 - videoconferencia
}

export class ComboConductor {
  id: number;
  label: string;
}
