export class CreatePuntoDto {
  nombre: string;
  dias: number[];
  grupo?: number;
}

export class UpdatePuntoDto {
  id: number;
  nombre?: string;
  dias?: number[];
  grupo?: number;
}
