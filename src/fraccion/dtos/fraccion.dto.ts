export class CreateFraccionDto {
  territorioId: number;
  iniciado: Date;
  programado?: Date;
  notas?: string;
  mapa?: string;
}

export class UpdateFraccionDto {
  id: number;
  territorio: number;
  iniciado: Date;
  programado?: Date;
  notas?: string;
  mapa?: string;
  mapa_file: Blob;
}

export class FraccionDrowdownDto {
  id: number;
  nombre: string;
}
