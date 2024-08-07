export class CreatePublicadorDto {
  nombre: string;
  apellido1: string;
  grupo_id: number;
  tareas?: number[];
}

export class UpdatePublicadorDto {
  id: number;
  nombre?: string;
  apellido1?: string;
  grupo_id?: number;
  tareas?: number[];
}

export class TablaPublicadorDto {
  id: number;
  nombre: string;
  apellido1: string;
  grupo_id?: number;
  grupo?: string;
  tareas?: number[];
}
