import {
  Injectable,
  NestMiddleware,
  Req,
  ExecutionContext,
} from '@nestjs/common';
import { RequestWithUserData } from 'express.interface';

@Injectable()
export class CheckAuthLevelFiveMiddleware implements NestMiddleware {
  req: RequestWithUserData;
  constructor(private context: ExecutionContext) {
    const httpContext = this.context.switchToHttp();
    this.req = httpContext.getRequest();
  }
  use(@Req() req: RequestWithUserData = this.req, next: Function) {
    // pass next if clearanceLevel in req.userData is <=5
    try {
      if (req.userData.clearanceLevel <= 5) {
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
