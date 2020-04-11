import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from 'src/auth/auth.module';
import { User } from './schemas/user.schema';
import { TypegooseModule } from 'nestjs-typegoose';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [
    TypegooseModule.forFeature([User]),
    AuthModule
  ],
  controllers: [UserController],
  providers: [UserService,
    AuthService
  ],
  exports: [TypegooseModule, UserService],
})
export class UserModule { }
