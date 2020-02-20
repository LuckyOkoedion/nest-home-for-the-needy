import { Injectable, NestMiddleware, Req, Res, ExecutionContext } from '@nestjs/common';
import { Response } from 'express';
import { RequestWithUserData } from 'express.interface';

@Injectable()
export class CheckAuthLevelOneMiddleware implements NestMiddleware {
  req: RequestWithUserData;
  constructor(private context: ExecutionContext) {
    const httpContext = this.context.switchToHttp();
    this.req = httpContext.getRequest();
  }
  use(@Req() req:RequestWithUserData = this.req, @Res() res: Response, next: Function) {
    //pass next if clearanceLevel in req.userData is === 1
    try {
      if (req.userData.clearanceLevel === 1) {
        next();
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
