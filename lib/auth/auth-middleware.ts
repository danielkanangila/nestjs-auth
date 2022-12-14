/**
 * @file Auth Middleware
 * @description
 */
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    /**
     * Save device info in the request
     */
    const deviceInfo = await this.authService.getDeviceInfo(req);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-next-line
    req.deviceInfo = deviceInfo;
    /**
     * Check if user is not logged
     */
    const { url } = req;
    const excludedUrls = ['/auth/login', '/auth/register'];
    let isExcludedUrl = false;

    excludedUrls.forEach((excludedUrl) => {
      if (url.includes(excludedUrl)) {
        isExcludedUrl = true;
      }
    });

    if (!isExcludedUrl) {
      const token = await this.authService.extractToken(req);
      const isTokenExists = await this.authService.checkToken(token);
      if (!isTokenExists) {
        throw new UnauthorizedException();
      }
    }
    next();
  }
}
