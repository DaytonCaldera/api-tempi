export class CreateConductorDto {
  publicadorId: number;
  dias: number[];
}

export class UpdateConductorDto {
  id: number;
  publicadorId: number;
  dias: number[];
}
