import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

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
  // Change to date type for production
  // readonly dateOfBirth: string;
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

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
