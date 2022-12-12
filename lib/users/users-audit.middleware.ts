import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class UserAuditMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.user && req.url.indexOf('auth') < 0) {
      console.log('User...', req.user);
    }
    next();
  }
}
