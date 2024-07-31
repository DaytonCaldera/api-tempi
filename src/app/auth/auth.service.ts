import { Injectable } from '@nestjs/common';
import { UsersService } from './../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Perfil, Users } from 'src/users/users.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async getUserProfile(username: string): Promise<Perfil> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.usersService.findOne(username);
    return user as Perfil;
  }

  async login(user: Users) {
    const payload = { username: user.user, sub: user.id };
    const token = this.jwtService.sign(payload);
    return {
      token: token,
    };
  }

  async logout() {}
}
