import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Perfil } from 'src/users/users.interface';
// import { AppConfig } from '../config/constants';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async signIn(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req): Promise<Perfil> {
    return await this.authService.getUserProfile(req.user.username);
  }

  @UseGuards(JwtAuthGuard)
  @Get('session')
  getSession(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async signOut() {
    return { status: 'ok' };
  }
}
