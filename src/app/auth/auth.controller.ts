import { Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async signIn(@Request() req, @Res({ passthrough: true }) res) {
    const { access_token } = await this.authService.login(req.user);
    res
      .cookie('access_token', access_token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        expires: new Date(Date.now() + 5 * 60 * 1000),
      })
      .send({ status: 'ok' });
    // return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('session')
  getSession(@Request() req) {
    return req.user;
  }

  @UseGuards()
  @Post('logout')
  async signOut(@Request() req, @Res({ passthrough: true }) res) {
    res
      .cookie('access_token', null, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        expires: new Date(Date.now()),
      })
      .send({ status: 'ok' });
  }
}
