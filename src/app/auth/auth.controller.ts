import { Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
// import { AppConfig } from '../config/constants';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async signIn(@Request() req) {
    // console.log(AppConfig.tokenExpireTime);

    // const { access_token } = await this.authService.login(req.user);
    // res
    //   .cookie('token', access_token, {
    //     httpOnly: true,
    //     secure: true,
    //     sameSite: 'strict',
    //     expires: new Date(Date.now() + 5 * 60 * 1000),
    //   })
    //   .send({ status: 'ok' });
    return this.authService.login(req.user);
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

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async signOut() {
    return { status: 'ok' };
  }
}
