import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from './constants';

@Injectable()
export class CheckAuthMiddleware implements NestMiddleware {
  use(req, res: Response, next: Function) {
    this.checkHeaders(req, res, next);
  }

  private async checkHeaders(req, res, next) {
    try {
      if (req.headers.authorization) {
        const token = await req.headers.authorization.split(' ')[1];
        if (token) {
          const decodedToken = await jwt.verify(token, jwtConstants.secret);
          req.userData = decodedToken;
          next();
        } else {
          this.handleError(null, next);
        }
      } else {
        this.handleError(null, next);
      }
    } catch (error) {
      this.handleError(error, next);
    }
  }

  private handleError(error: Error, next: Function) {
    if (error) {
      error.message = 'Auth Failed!!!';
      next(error);
    } else {
      const error = new Error();
      error.message = 'Auth Failed !!!';
      next(error);
    }
  }
}
