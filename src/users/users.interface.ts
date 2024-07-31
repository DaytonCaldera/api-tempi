export interface Perfil {
  id: number;
  user: string;
  password: string;
  nombre: string;
  congregacion: number;
}
export interface Users extends Perfil {
  password: string;
}

export class UserProperties {
  static congregacion: number = 0;
}
