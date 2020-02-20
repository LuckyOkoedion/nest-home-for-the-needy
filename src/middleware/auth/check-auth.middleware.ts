import {
  Injectable,
  NestMiddleware,
  Req,
  Res,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { IUserData } from 'src/user/interfaces/user.interface';
import { RequestWithUserData } from 'express.interface';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class CheckAuthMiddleware implements NestMiddleware {
  req: RequestWithUserData;
  constructor(
    private readonly authService: AuthService,
    private context: ExecutionContext,
  ) {
    const httpContext = this.context.switchToHttp();
    this.req = httpContext.getRequest();
  }
  use(req: RequestWithUserData = this.req, next: CallHandler) {
    this.checkHeaders(req, next);
  }

  private async checkHeaders(req: RequestWithUserData, next: CallHandler) {
    try {
      if (req.headers.authorization) {
        const token = await req.headers.authorization.split(' ')[1];
        if (token) {
          const decodedToken: IUserData = await this.authService.verifyJwtAndReturnPayloadDecoded(
            token,
          );
          req.userData = {
            email: decodedToken.email,
            userId: decodedToken.userId,
            clearanceLevel: decodedToken.clearanceLevel,
          };
          return next.handle();
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

  private handleError(error: Error, next: CallHandler): Observable<any> {
    if (error) {
      error.message = 'Auth Failed!!!';
      return next.handle().pipe(catchError(err => throwError(error)));
    } else {
      const error = new Error();
      error.message = 'Auth Failed !!!';
      return next.handle().pipe(catchError(err => throwError(error)));
    }
  }
}
