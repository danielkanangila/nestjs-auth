/**
 * @file Auth Middleware
 * @description Check if user is logged in
 */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { url } = req;
    const excludedUrls = ['/auth/login', '/auth/register'];
    let isExcludedUrl = false;

    excludedUrls.forEach((excludedUrl) => {
      if (url.includes(excludedUrl)) {
        isExcludedUrl = true;
      }
    });

    if (!isExcludedUrl) {
      // check if user is not logged in
      const token = await this.authService.extractToken(req);
      const isTokenExists = await this.authService.checkToken(token);
      if (!isTokenExists) {
        res.status(401).send('Unauthorized');
        return;
      }
    }
    next();
  }
}
