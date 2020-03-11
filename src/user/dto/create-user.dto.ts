import { IsNotEmpty, IsString, IsEmail, IsDate, IsArray, IsOptional } from 'class-validator';

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
  @IsString()
  readonly dateOfBirthString: string;
  @IsOptional()
  @IsString()
  readonly profilePic?: String;
  @IsString()
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

export class CreateUserWithoutPasswordDto {
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
  @IsOptional()
  @IsString()
  readonly profilePic?: String;
  @IsString()
  @IsNotEmpty()
  readonly email: string;
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
  @IsOptional()
  @IsString()
  readonly firstName?: string;
  @IsOptional()
  @IsString()
  readonly lastName?: string;
  @IsOptional()
  @IsString()
  readonly gender?: string;
  @IsOptional()
  @IsDate()
  readonly dateOfBirth?: Date;
  @IsOptional()
  @IsString()
  readonly profilePic?: String;
  @IsOptional()
  @IsString()
  readonly email?: string;
  @IsString()
  readonly phoneNo?: string;
  @IsOptional()
  @IsString()
  readonly nationality?: string;
  @IsOptional()
  @IsString()
  readonly religion?: string;
  @IsOptional()
  @IsString()
  readonly organisation?: string;
}

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  readonly email: string;
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

export class UserDataDto {
  @IsString()
  readonly email: string;
  @IsString()
  readonly userId: string;
  @IsString()
  readonly clearanceLevel: string;
  @IsOptional()
  @IsArray()
  readonly permissions?: [];
}
