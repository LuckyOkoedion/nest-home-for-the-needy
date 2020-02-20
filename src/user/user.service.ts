import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { IUser, IUserBody } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@Inject('USER_MODEL') private readonly UserModel: Model<IUser>) {}

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
                    console.log(hashRejectionReason);
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
                      console.log(error);
                    }
                  },
                  creationRejectionReason => {
                    console.log(creationRejectionReason);
                  },
                );
            } catch (error) {
              console.log(error);
            }
          }
          // const error = new Error();
          // error.message = 'User Exists !';
          // throw error;
        },
        afterfindRejectionReason => {
          console.log(afterfindRejectionReason);
        },
      );
    //Send verification email #### TODO#

    //return the response
    return createdUser;
  }
}
