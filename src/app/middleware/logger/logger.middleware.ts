import { Injectable, NestMiddleware, Req, Res } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(@Req() req, @Res() res, next: () => void) {
    console.log('Logger middleware...');
    next();
  }
}
