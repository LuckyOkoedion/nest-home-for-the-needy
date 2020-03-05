import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/user/dto/create-user.dto';
import { permissionsEnum } from 'src/utils/permissions.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUser(email: string): Promise<any> {
    const result = await this.userService.findUserWithEmail(email);
    const user = result[0];
    if (user) {
      // Construct userData and add permissions to it based on the accessLevel

      // For super User (accessLevel 1)
      if (user.accessLevel === 1) {
        const userData = {
          email: user.email,
          userId: user._id,
          clearanceLevel: user.accessLevel,
          permissions: [
            permissionsEnum.DELETE_OWN_COMMENT,
            permissionsEnum.DELETE_OTHERS_COMMENT,
            permissionsEnum.READ_DONATIONS,
            permissionsEnum.UPDATE_DONATIONS,
            permissionsEnum.DELETE_DONATIONS,
            permissionsEnum.MANAGE_DONATION_ANALYTICS,
            permissionsEnum.MANAGE_USERS,
            permissionsEnum.CREATE_PUBLIC_SITE_DATA,
            permissionsEnum.UPDATE_PUBLIC_SITE_DATA,
            permissionsEnum.UPDATE_OWN_COMMENT,
            permissionsEnum.UPDATE_OWN_BLOG,
            permissionsEnum.DELETE_OWN_BLOG,
            permissionsEnum.UPDATE_OTHERS_BLOG,
            permissionsEnum.CREATE_INTERNAL_DATA,
            permissionsEnum.READ_INTERNAL_DATA,
            permissionsEnum.UPDATE_INTERNAL_DATA,
            permissionsEnum.DELETE_INTERNAL_DATA,
            permissionsEnum.CREATE_EVENTS,
            permissionsEnum.UPDATE_EVENTS,
            permissionsEnum.DELETE_EVENTS,
            permissionsEnum.MANAGE_GALLERY,
            permissionsEnum.MANAGE_PROJECTS,
            permissionsEnum.MANAGE_RESIDENTS,
            permissionsEnum.MANAGE_VISITS,
            permissionsEnum.MANAGE_VISITANALYTICS,
            permissionsEnum.APPROVE_BLOG,
            permissionsEnum.SHOW_HIDE_COMMENT,
            permissionsEnum.CREATE_BLOG,
            permissionsEnum.MAKE_COMMENT,
            permissionsEnum.READ_PROJECTS,
            permissionsEnum.MAKE_DONATIONS,
            permissionsEnum.READ_EVENTS,
            permissionsEnum.READ_RESIDENTS,
            permissionsEnum.READ_USERPROFILES,
            permissionsEnum.MANAGE_OWN_PROFILE,
          ],
        };
        return userData;
      }

      // For Editor (accessLevel 2)
      if (user.accessLevel === 2) {
        const userData = {
          email: user.email,
          userId: user._id,
          clearanceLevel: user.accessLevel,
          permissions: [
            permissionsEnum.CREATE_PUBLIC_SITE_DATA,
            permissionsEnum.UPDATE_PUBLIC_SITE_DATA,
            permissionsEnum.UPDATE_OWN_COMMENT,
            permissionsEnum.UPDATE_OWN_BLOG,
            permissionsEnum.DELETE_OWN_BLOG,
            permissionsEnum.UPDATE_OTHERS_BLOG,
            permissionsEnum.CREATE_INTERNAL_DATA,
            permissionsEnum.READ_INTERNAL_DATA,
            permissionsEnum.UPDATE_INTERNAL_DATA,
            permissionsEnum.DELETE_INTERNAL_DATA,
            permissionsEnum.CREATE_EVENTS,
            permissionsEnum.UPDATE_EVENTS,
            permissionsEnum.DELETE_EVENTS,
            permissionsEnum.MANAGE_GALLERY,
            permissionsEnum.MANAGE_PROJECTS,
            permissionsEnum.MANAGE_RESIDENTS,
            permissionsEnum.MANAGE_VISITS,
            permissionsEnum.MANAGE_VISITANALYTICS,
            permissionsEnum.APPROVE_BLOG,
            permissionsEnum.SHOW_HIDE_COMMENT,
            permissionsEnum.CREATE_BLOG,
            permissionsEnum.MAKE_COMMENT,
            permissionsEnum.READ_PROJECTS,
            permissionsEnum.MAKE_DONATIONS,
            permissionsEnum.READ_EVENTS,
            permissionsEnum.READ_RESIDENTS,
            permissionsEnum.READ_USERPROFILES,
            permissionsEnum.MANAGE_OWN_PROFILE,
            permissionsEnum.DELETE_OWN_COMMENT,
            permissionsEnum.DELETE_OTHERS_COMMENT,
          ],
        };
        return userData;
      }

      // For Moderator (accessLevel 3)
      if (user.accessLevel === 3) {
        const userData = {
          email: user.email,
          userId: user._id,
          clearanceLevel: user.accessLevel,
          permissions: [
            permissionsEnum.APPROVE_BLOG,
            permissionsEnum.SHOW_HIDE_COMMENT,
            permissionsEnum.CREATE_BLOG,
            permissionsEnum.MAKE_COMMENT,
            permissionsEnum.READ_PROJECTS,
            permissionsEnum.MAKE_DONATIONS,
            permissionsEnum.READ_EVENTS,
            permissionsEnum.READ_RESIDENTS,
            permissionsEnum.READ_USERPROFILES,
            permissionsEnum.MANAGE_OWN_PROFILE,
            permissionsEnum.UPDATE_OWN_COMMENT,
            permissionsEnum.UPDATE_OWN_BLOG,
            permissionsEnum.DELETE_OWN_BLOG,
            permissionsEnum.UPDATE_OTHERS_BLOG,
            permissionsEnum.DELETE_OWN_COMMENT,
          ],
        };
        return userData;
      }

      // For Contributor (accessLevel 4)
      if (user.accessLevel === 4) {
        const userData = {
          email: user.email,
          userId: user._id,
          clearanceLevel: user.accessLevel,
          permissions: [
            permissionsEnum.CREATE_BLOG,
            permissionsEnum.UPDATE_OWN_BLOG,
            permissionsEnum.DELETE_OWN_BLOG,
            permissionsEnum.MAKE_COMMENT,
            permissionsEnum.UPDATE_OWN_COMMENT,
            permissionsEnum.DELETE_OWN_COMMENT,
            permissionsEnum.READ_PROJECTS,
            permissionsEnum.MAKE_DONATIONS,
            permissionsEnum.READ_EVENTS,
            permissionsEnum.READ_RESIDENTS,
            permissionsEnum.READ_USERPROFILES,
            permissionsEnum.MANAGE_OWN_PROFILE,
          ],
        };
        return userData;
      }

      // Registered User (accessLevel 5)
      if (user.accessLevel === 5) {
        const userData = {
          email: user.email,
          userId: user._id,
          clearanceLevel: user.accessLevel,
          permissions: [
            permissionsEnum.READ_PROJECTS,
            permissionsEnum.MAKE_DONATIONS,
            permissionsEnum.READ_EVENTS,
            permissionsEnum.READ_RESIDENTS,
            permissionsEnum.READ_USERPROFILES,
            permissionsEnum.MANAGE_OWN_PROFILE,
          ],
        };
        return userData;
      }
    }
    throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
  }

  async logIn(login: LoginDto) {
    let payload: any = undefined;
    // Search for user with email
    return await this.userService
      .findUserWithEmail({ email: login.email })
      // if not found, return error
      .then(async user => {
        if (user.length < 1) {
          const error = new Error();
          error.message = 'No such user in database';
          throw error;
        }
        payload = { email: user[0].email, sub: user[0]._id };
        // if found, bcrypt compare provided password with hashed password
        return await bcrypt.compare(login.password, user[0].password);
      })
      .then(async result => {
        if (result) {
          const authToken = await this.jwtService.sign(payload);
          // authToken = await jwt.sign(userData, jwtConstants.secret, {
          //   expiresIn: '1h',
          // });

          return authToken;
        }
        const error = new Error();
        error.message = 'Login Failed!';
        throw error;
      })
      .catch(error => {
        return error;
      });
  }
}
