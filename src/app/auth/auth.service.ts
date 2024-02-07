import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ user: any; token: string }> {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    console.log(user);

    const payload = { sub: user.id, username: user.user };

    return {
      user: user,
      token: await this.jwtService.signAsync(payload),
    };
  }

  async verifyToken(token: string): Promise<any> {
    try {
      const verified = await this.jwtService.verify(token);
      console.log(verified);
      return verified;
    } catch (err) {}
  }
}
