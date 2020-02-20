import { Document } from 'mongoose';

export interface IUser extends Document {
  readonly firstName: string;
  readonly lastName: string;
  readonly gender: string;
  readonly dateOfBirth: Date;
  readonly email: string;
  readonly phoneNo: string;
  readonly password: string;
  readonly hasVerifiedEmail?: boolean;
  readonly ipAddressess?: [];
  readonly pageVisits?: [
    {
      readonly homePage: number;
      readonly aboutPage: number;
      readonly contactPage: number;
      readonly donatePage: number;
      readonly eventsPage: number;
      readonly blogPage: number;
      readonly projectsPage: number;
    },
  ];
  readonly interest?: string;
  readonly nationality: string;
  readonly religion: string;
  readonly organisation?: string; // use a select input at front end and form for 'others' option
  readonly projectManagingProjectId?: string;
  readonly type?: string;
  readonly accessLevel?: number;
}

export interface IUserData {
  email: string;
  userId: string;
  clearanceLevel: number;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IUserBody {
  readonly firstName: string;
  readonly lastName: string;
  readonly gender: string;
  readonly dateOfBirth: Date;
  readonly email: string;
  readonly phoneNo: string;
  readonly nationality: string;
  readonly religion: string;
  readonly organisation: string;
}
