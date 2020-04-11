import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { permissionsEnum } from 'src/utils/permissions.enum';
import { User } from 'src/user/schemas/user.schema';
import { DocumentType, ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly UserModel: ReturnModelType<typeof User>,
  ) { }

  createToken(userId: string, ttl?: number) {
    const expiresIn = ttl || "3h";
    const secretOrKey = 'secret';
    const user = { userId };
    const token = jwt.sign(user, secretOrKey, { expiresIn });
    return {
      expires_in: expiresIn,
      access_token: token
    };
  }

  async validateUser(id: string): Promise<boolean> {
    const result = await this.UserModel.findById(id).exec()
    return !!result;
  }


  async constructUserDataWithPermissions(user: DocumentType<User>) {

    // For super User (accessLevel 1)
    if (user.accessLevel === 1) {
      const userData = {
        email: user.email,
        userId: user.id,
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
        userId: user.id,
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
        userId: user.id,
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
        userId: user.id,
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
        userId: user.id,
        clearanceLevel: user.accessLevel,
        permissions: [
          permissionsEnum.READ_PROJECTS,
          permissionsEnum.MAKE_DONATIONS,
          permissionsEnum.READ_EVENTS,
          permissionsEnum.READ_RESIDENTS,
          permissionsEnum.READ_USERPROFILES,
          permissionsEnum.MANAGE_OWN_PROFILE,
          permissionsEnum.MAKE_COMMENT,
          permissionsEnum.UPDATE_OWN_COMMENT,
          permissionsEnum.DELETE_OWN_COMMENT,
        ],
      };
      return userData;
    }
  }

}
