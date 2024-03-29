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
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.user === username);
  }
}
