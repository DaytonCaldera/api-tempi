import { Injectable, NestMiddleware, Req, Res } from '@nestjs/common';
import { UserProperties } from 'src/users/users.interface';

@Injectable()
export class ClientIdMiddleware implements NestMiddleware {
  use(@Req() req, @Res() res, next: () => void) {
    const clientId = req.headers?.cid;
    if (!clientId) {
      res.status(400).send({ message: 'Client missing, is it logged in?' });
      return;
    }
    UserProperties.congregacion = clientId;
    next();
  }
}
