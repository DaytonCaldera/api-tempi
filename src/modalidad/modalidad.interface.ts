import { Conductor } from 'src/conductor/conductor.interface';

export class Modalidad {
  id: number;
  modalidad: string;
  conductor?: Conductor[];
}
