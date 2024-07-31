import { Injectable } from '@nestjs/common';
import { Users } from './users.interface';

export type User = Users;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 1,
      user: 'dayton',
      password: 'admin123',
      nombre: 'daytiton',
      congregacion: 1,
    },
    {
      id: 2,
      user: 'will',
      password: 'admin123',
      nombre: 'Will antonio',
      congregacion: 2,
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.user === username);
  }
}
