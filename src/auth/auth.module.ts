import { Module, forwardRef, DynamicModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { strategyValueProvider } from './strategy.config';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from 'src/user/schemas/user.schema';


@Module({})
export class AuthModule {
  static forRoot(strategy?: 'jwt'): DynamicModule {
    strategy = strategy ? strategy : 'jwt';
    const strategyProvider = {
      provide: 'Strategy',
      useFactory: async (
        authService: AuthService
      ) => {
        const Strategy = (await import(`./passports/${strategy}.strategy`))
          .default;
        return new Strategy(authService);
      },
      inject: [AuthService]
    };

    return {
      module: AuthModule,
      imports: [
        // Brought in here because of the jwt.strategy.ts class that needs it.
        TypegooseModule.forFeature([User]),
      ],
      controllers: [AuthController],
      providers: [
        strategyValueProvider,
        AuthService,
        strategyProvider
      ],
      exports: [AuthService, strategyProvider, TypegooseModule],
    }
  }


}
