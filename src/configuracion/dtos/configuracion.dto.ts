export class CreateConfiguracionDto {
  tipo: string;
  dias: number[];
  hora: string;
}

export class UpdateConfiguracionDto {
  id: number;
  tipo: string;
  dias: number[];
  hora: string;
}
