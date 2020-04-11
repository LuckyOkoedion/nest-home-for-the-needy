import {
    HttpStatus,
    Injectable,
    NestMiddleware,
    Inject
} from '@nestjs/common';
import * as passport from 'passport';
import { UserService } from 'src/user/user.service';
import { Request, Response } from "express";

@Injectable()
export class PassportAuthMiddleware implements NestMiddleware {
    theStrategy: string;
    constructor(private userService: UserService, @Inject('PASSPORT_STRATEGY') strategy: string) {
        this.theStrategy = strategy;
    }

    use(req: Request, res: Response, next: Function) {

        return passport.authenticate(this.theStrategy, async (...args: any[]) => {
            const [, payload, err] = args;
            if (err) {
                return res
                    .status(HttpStatus.BAD_REQUEST)
                    .send('Unable to authenticate the user...have you logged in?');
            }

            const userData = await this.userService.getUserByIdAndValidate(payload.userId)
            req.user = userData;
            // console.log(req.user)
            return next();
        })(req, res, next);

    }
}
