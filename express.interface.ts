import { Request } from 'express';
import { UserDataDto } from 'src/user/dto/create-user.dto';

export interface RequestWithUserData extends Request {
  userData: UserDataDto;
}

export interface ResponseWithError<Error> {
  error: Error;
}
