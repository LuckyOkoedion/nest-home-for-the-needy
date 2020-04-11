import * as passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';




@Injectable()
export default class JwtStrategy extends Strategy {
    constructor(private readonly authservice: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            passReqToCallback: true,
            secretOrKey: "secret"
        },
            async (req, payload: { userId: string }, next) => {
                return await this.verify(req, payload, next);
            }
        );

        passport.use(this);
    }

    public async verify(req, payload: { userId: string }, done) {
        const isValid = await this.authservice.validateUser(payload.userId)
        if (!isValid) {
            return done('Unauthorized', null);
        } else {
            return done(null, payload);
        }
    }



}
