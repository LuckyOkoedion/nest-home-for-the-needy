import {
  Injectable,
  HttpException,
  HttpStatus,
  Scope,
  Inject,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginDto, UserDataDto } from 'src/user/dto/create-user.dto';
import { InjectModel } from "nestjs-typegoose";
import { EditUserDto, CreateUserWithoutPasswordDto } from './dto/create-user.dto';
import { REQUEST } from '@nestjs/core';
import { RequestWithUserData } from 'express.interface';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from './schemas/user.schema';
import { AuthService } from 'src/auth/auth.service';

@Injectable({ scope: Scope.REQUEST })
export class UserService {
  constructor(
    @InjectModel(User) private readonly UserModel: ReturnModelType<typeof User>,
    @Inject(REQUEST) private readonly request: RequestWithUserData,
    private readonly authService: AuthService
  ) { }



  async validateAndConstructUser(email: string, password: string): Promise<UserDataDto> {
    const result = await this.findUserWithEmail(email);
    const user = result[0];
    const pass = await bcrypt.compare(password, user.password);
    if (pass) {
      // Construct userData and add permissions to it based on the accessLevel
      return await this.authService.constructUserDataWithPermissions(user)

    }
    throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
  }

  async signUp(userBody: CreateUserWithoutPasswordDto, password: string) {

    // Make the first user created in the users collection a superuser with highest accessLevel = 1
    const numberOfDocuments = await this.UserModel.estimatedDocumentCount();
    if (numberOfDocuments < 1) {
      //Create the user with the private 'createUser()' method detailed below

      const createdUser = await this.createUser(userBody, password);
      //Retrieve the userId
      const userId = await createdUser._id;
      // Update the user with the highest accessLevel =1
      return await this.UserModel.updateOne(
        { _id: userId },
        { $set: { accessLevel: 1 } },
      ).exec();
    }
    // otherwise create this new user with lowest accessLevel =5
    if (numberOfDocuments >= 1) {
      return await this.createUser(userBody, password);
    }
  }

  async logIn(login: LoginDto): Promise<{ userId: string }> {
    let payload: { userId: string };
    // Search for user with email
    return await this.findUserWithEmail(login.email)
      // if not found, return error
      .then(async user => {
        if (user.length < 1) {
          const error = new Error();
          error.message = 'No such user in database';
          throw error;
        }
        payload = { userId: user[0].id };
        // if found, bcrypt compare provided password with hashed password
        return await bcrypt.compare(login.password, user[0].password);
      })
      .then(async result => {
        if (result) {
          return payload
        }
        const error = new Error();
        error.message = 'Login Failed!';
        throw error;
      })
      .catch(error => {
        return error;
      });
  }

  async findUserWithEmail(theMail: string) {
    const result = await this.UserModel.find({ email: theMail }).exec();
    return result;
  }

  async findOneOrFail(id: string) {
    const result = await this.UserModel.findById(id).exec()
    if (result) {
      return result;
    } else {
      throw new Error("Passport derialization Failed. No such user id")
    }


  }

  async getUserByIdAndValidate(id: string) {
    const user = await this.UserModel.findById(id).exec()
    if (user) {
      // Construct userData and add permissions to it based on the accessLevel
      return await this.authService.constructUserDataWithPermissions(user)
    }
  }

  async getAllUsers() {
    return await this.UserModel.find().exec();
  }

  async getUserDetail(userId) {
    return await this.UserModel.findById(userId).exec();
  }

  async editUser(userId, edit) {
    return await this.UserModel.update({ _id: userId }, edit).exec();
  }

  async editOwnProfile(userId: string, edit: EditUserDto) {
    const editorUserId: string = this.request.user.userId;
    const theProfile = await this.UserModel.findById(userId);
    if (theProfile.id === editorUserId) {
      return await this.UserModel.update({ _id: userId }, edit).exec();
    } else {
      throw new Error(
        'You are not authorized to edit a profile that is not yours.',
      );
    }
  }

  async deleteOwnAccount(userId: string) {
    const editorUserId: string = this.request.user.userId;
    const theProfile = await this.UserModel.findById(userId);
    if (theProfile.id === editorUserId) {
      return await this.UserModel.deleteOne({ _id: userId });
    } else {
      throw new Error(
        'You are not authorized to deactivate an account that is not yours',
      );
    }
  }

  async deleteUser(userId) {
    return await this.UserModel.deleteOne({ _id: userId });
  }

  async makeEditor(userId, role = 2) {
    return await this.UserModel.updateOne(
      { _id: userId },
      { $set: { accessLevel: role } },
    ).exec();
  }

  async makeReader(userId, role = 5) {
    return await this.UserModel.updateOne(
      { _id: userId },
      { $set: { accessLevel: role } },
    );
  }

  async makeContributor(userId, role = 4) {
    return await this.UserModel.updateOne(
      { _id: userId },
      { $set: { accessLevel: role } },
    );
  }

  async makeModerator(userId, role = 3) {
    return await this.UserModel.updateOne(
      { _id: userId },
      { $set: { accessLevel: role } },
    );
  }

  // TODO

  async changeEmail(currentPassword, newEmail) {
    // first set hasVerifiedEmail to false in database
  }

  async sendPasswordChangeLink(email) { }

  async passwordChange(newPassword) { }

  // Private methods

  private async createUser(userBody: CreateUserWithoutPasswordDto, password: string) {

    try {
      const theQuery = await this.UserModel.find({ email: userBody.email })
        .exec()
      const passwordHash = await bcrypt.hash(password, 10)
      if (theQuery.length < 1) {
        const theUser = {
          firstName: userBody.firstName,
          lastName: userBody.lastName,
          gender: userBody.gender,
          dateOfBirth: userBody.dateOfBirth,
          email: userBody.email,
          phoneNo: userBody.phoneNo,
          password: passwordHash,
          nationality: userBody.nationality,
          religion: userBody.religion,
          organisation: userBody.organisation,
        }
        return await this.UserModel.create(theUser);
      } throw new HttpException("An account with this email already exists", HttpStatus.UNPROCESSABLE_ENTITY)
    } catch (error) {
      throw new HttpException(
        error.message,
        HttpStatus.NOT_IMPLEMENTED,
      );
    }

  }
}
