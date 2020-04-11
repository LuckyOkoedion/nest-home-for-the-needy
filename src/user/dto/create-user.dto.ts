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

export class UserDto {
  readonly _id: string;
  readonly firstName!: string;
  readonly lastName!: string;
  readonly gender: string;
  readonly dateOfBirth: Date;
  readonly email!: string;
  readonly hasVerifiedEmail: boolean;
  readonly phoneNo: string;
  readonly password: string;
  readonly profilePic?: string;
  readonly nationality: string;
  readonly religion: string;
  readonly organisation: string;
  readonly typeOfUser: string;
  readonly accessLevel: number;
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
  readonly clearanceLevel: number;
  @IsOptional()
  @IsArray()
  readonly permissions?: string[];
}
