import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto, LoginDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { IUser, IUserData } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from '../middleware/auth/constants';

@Injectable()
export class UserService {
  constructor(@Inject('USER_MODEL') private readonly UserModel: Model<IUser>) {}
  
  async signUp(user: CreateUserDto, password: string) {
    let createdUser: IUser;
    //Search for user with email
    await this.UserModel.find({ email: user.email })
      .exec()
      // Check if email exists on the web - ##### TODO ####
      //If email exists on web and not already in db, Hash the password
      .then(async returnedValue => {
        if (returnedValue.length < 1) {
          try {
            await bcrypt.hash(password, 10).then(returnedValue => {
              return returnedValue;
            });
          } catch (error) {
            console.log(error);
          }
        }
        const error = new Error();
        error.message = 'User Exists !';
        throw error;
      })
      //Create the user
      .then(async passwordHash => {
        try {
          createdUser = await new this.UserModel({
            firstName: user.firstName,
            lastName: user.lastName,
            gender: user.gender,
            dateOfBirth: user.dateOfBirth,
            email: user.email,
            phoneNo: user.phoneNo,
            password: passwordHash,
            nationality: user.nationality,
            religion: user.religion,
            organisation: user.organisation,
          }).save();
        } catch (error) {
          console.log(error);
        }
      });
    //Send verification email #### TODO#

    //return the response
    return createdUser;
  }

  async logIn(login: LoginDto) {
    let userData: IUserData = undefined;
    // Search for user with email
    return await this.UserModel.find({ email: login.email })
      // if not found, return error
      .exec()
      .then(async user => {
        if (user.length < 1) {
          const error = new Error();
          error.message = 'Auth Failed';
          throw error;
        }
        userData.email = user[0].email;
        userData.userId = user[0]._id;
        userData.clearanceLevel = user[0].accessLevel;
        // if found, bcrypt compare provided password with hashed password
        return await bcrypt.compare(login.password, user[0].password);
      })
      .then(result => {
        if (result) {
          const authToken = jwt.sign(userData, jwtConstants.secret, {
            expiresIn: '1h',
          });
          return authToken;
        }
        const error = new Error();
        error.message = 'Auth Failed!';
        throw error;
      })
      .catch(error => {
        return error;
      });
  }

  async getAllUsers() {}

  async getUserDetail(userId) {}

  async editUser(userId, edit) {}

  async deleteUser(userId) {}

  async makeEditor(userId, role = 2) {}

  async makeReader(userId, role = 5) {}

  async makeContributor(userId, role = 4) {}

  async makeModerator(userId, role = 3) {}

  // TODO

  async changeEmail(currentPassword, newEmail) {
    // first set hasVerifiedEmail to false in database
  }

  async sendPasswordChangeLink(email) {}

  async passwordChange(newPassword) {}
}
