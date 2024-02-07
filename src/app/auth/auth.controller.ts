import { Public } from './../decorators/public.decorator';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { SetCookieMiddleware } from '../middleware/setcookie/setcookie.middleware';

@Controller('auth')
@UseInterceptors(SetCookieMiddleware)
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  async signIn(@Body() signInDto: Record<string, any>, @Res({ passthrough: true }) res) {
    const auth = await this.authService.signIn(signInDto.username, signInDto.password);
    res.cookie('token', auth.token, { httpOnly: true, secure: true, maxAge: 3600 * 1000 });
    return auth?.user;
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

  @Get('session')
  getToken(@Param('token') token: string) {
    return this.authService.verifyToken(token);
  }
}
