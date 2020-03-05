import { IsNotEmpty, IsString, IsEmail, IsDate } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;
  @IsString()
  @IsNotEmpty()
  readonly gender: string;
  @IsDate()
  readonly dateOfBirth: Date;
  @IsString()
  readonly profilePic?: String;
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsString()
  @IsNotEmpty()
  readonly phoneNo: string;
  @IsString()
  @IsNotEmpty()
  readonly nationality: string;
  @IsString()
  @IsNotEmpty()
  readonly religion: string;
  @IsString()
  readonly organisation: string;
}

export class EditUserDto {
  @IsString()
  readonly firstName?: string;
  @IsString()
  readonly lastName?: string;
  @IsString()
  readonly gender?: string;
  @IsDate()
  readonly dateOfBirth?: Date;
  @IsString()
  readonly profilePic?: String;
  @IsEmail()
  readonly email?: string;
  @IsString()
  readonly phoneNo?: string;
  @IsString()
  readonly nationality?: string;
  @IsString()
  readonly religion?: string;
  @IsString()
  readonly organisation?: string;
}

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
