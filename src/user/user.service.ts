import {
  Injectable,
  HttpException,
  HttpStatus,
  Scope,
  Inject,
} from '@nestjs/common';
import { IUser, IUserBody } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { EditUserDto } from './dto/create-user.dto';
import { REQUEST } from '@nestjs/core';
import { RequestWithUserData } from 'express.interface';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from './schemas/user.schema';

@Injectable({ scope: Scope.REQUEST })
export class UserService {
  constructor(
    @InjectModel('User') private readonly UserModel: ReturnModelType<typeof User>,
    @Inject(REQUEST) private readonly request: RequestWithUserData,
  ) {}

  async signUp(userBody: IUserBody, password: string) {
    // Make the first user created in the users collection a superuser with highest accessLevel = 1
    const numberOfDocuments = await this.UserModel.estimatedDocumentCount();
    if (numberOfDocuments < 1) {
      //Create the user with the private 'createUser()' method detailed below
      const createdUser = await this.createUser(userBody, password);
      //Retrieve the userId
      const userId = createdUser._id;
      // Update the user with the highest accessLevel =1
      return await this.UserModel.updateOne(
        { _id: userId },
        { $set: { accessLevel: 1 } },
      ).exec();
    }
    // otherwise create this new user with lowest accessLevel =5
    if (numberOfDocuments >= 1) {
      return this.createUser(userBody, password);
    }
  }

  async findUserWithEmail(email) {
    const result = await this.UserModel.find({ email: email }).exec();
    return result;
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
    const editorUserId: string = this.request.userData.userId;
    const theProfile = await this.UserModel.findById(userId);
    if (theProfile._id === editorUserId) {
      return await this.UserModel.update({ _id: userId }, edit).exec();
    } else {
      throw new Error(
        'You are not authorized to edit a profile that is not yours.',
      );
    }
  }

  async deleteOwnAccount(userId: string) {
    const editorUserId: string = this.request.userData.userId;
    const theProfile = await this.UserModel.findById(userId);
    if (theProfile._id === editorUserId) {
      return await this.UserModel.remove({ _id: userId });
    } else {
      throw new Error(
        'You are not authorized to deactivate an account that is not yours',
      );
    }
  }

  async deleteUser(userId) {
    return await this.UserModel.remove({ _id: userId });
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

  async sendPasswordChangeLink(email) {}

  async passwordChange(newPassword) {}

  // Private methods

  private async createUser(userBody: IUserBody, password: string) {
    let createdUser: IUser;
    //Search for user with email
    await this.UserModel.find({ email: userBody.email })
      .exec()
      // Check if email exists on the web - ##### TODO ####
      //If email exists on web and not already in db, Hash the password
      .then(
        async returnedValue => {
          if (returnedValue.length < 1) {
            try {
              await bcrypt
                .hash(password, 10)
                .then(
                  returnedValue => {
                    return returnedValue;
                  },
                  hashRejectionReason => {
                    throw new HttpException(
                      hashRejectionReason,
                      HttpStatus.NOT_IMPLEMENTED,
                    );
                  },
                )
                //Create the user
                .then(
                  async passwordHash => {
                    try {
                      createdUser = await new this.UserModel({
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
                      }).save();
                    } catch (error) {
                      throw new HttpException(
                        error.message,
                        HttpStatus.NOT_IMPLEMENTED,
                      );
                    }
                  },
                  creationRejectionReason => {
                    throw new HttpException(
                      creationRejectionReason,
                      HttpStatus.NOT_IMPLEMENTED,
                    );
                  },
                );
            } catch (error) {
              throw new HttpException(
                error.message,
                HttpStatus.NOT_IMPLEMENTED,
              );
            }
          }
          // const error = new Error();
          // error.message = 'User Exists !';
          // throw error;
        },
        afterfindRejectionReason => {
          throw new HttpException(
            afterfindRejectionReason,
            HttpStatus.NOT_IMPLEMENTED,
          );
        },
      );
    //Send verification email #### TODO#

    //return the response
    return createdUser;
  }
}
