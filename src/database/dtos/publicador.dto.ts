export class CreatePublicadorDto {
  nombre: string;
  apellido1: string;
  grupo_id: number;
}

export class UpdatePublicadorDto {
  id: number;
  nombre?: string;
  apellido1?: string;
  grupo_id?: number;
}

export class TablaPublicadorDto {
  id: number;
  nombre: string;
  apellido1: string;
  grupo_id?: number;
  grupo?: string;
  es_conductor: boolean;
}
