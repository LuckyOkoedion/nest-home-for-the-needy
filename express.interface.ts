import { Request } from 'express';
import { IUserData } from 'src/user/interfaces/user.interface';

export interface RequestWithUserData extends Request {
  userData: IUserData;
}

export interface ResponseWithError<Error> {
  error: Error;
}
