import { prop, mongoose } from '@typegoose/typegoose';
import {
  IsString,
  IsDate,
  IsBoolean,
  IsNumber,
} from 'class-validator';

export class User {
  @IsString()
  @prop({
    required: true,
  })
  firstName!: string;
  @IsString()
  @prop({
    required: true,
  })
  lastName!: string;
  @IsString()
  @prop()
  gender: string;
  @IsDate()
  @prop()
  dateOfBirth: Date;
  @IsString()
  @prop({
    required: true,
  })
  email!: string;
  @IsBoolean()
  @prop({
    default: false,
  })
  hasVerifiedEmail: boolean;
  @IsString()
  @prop({
    required: true,
  })
  phoneNo: string;
  @IsString()
  @prop({
    required: true,
  })
  password: string;
  @IsString()
  @prop()
  profilePic?: string;
  @IsString()
  @prop()
  nationality: string;
  @IsString()
  @prop()
  religion: string;
  @IsString()
  @prop()
  organisation: string;
  @IsString()
  @prop()
  typeOfUser: string;
  @IsNumber()
  @prop({ default: 5 })
  accessLevel: number;
}

