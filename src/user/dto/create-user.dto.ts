import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsNumber,
  IsArray,
  IsEmail,
} from 'class-validator';

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
  @IsNotEmpty()
  readonly dateOfBirth: Date;
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  @IsString()
  @IsNotEmpty()
  readonly phoneNo: string;
  @IsArray()
  readonly ipAddressess?: [];
  @IsArray()
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
  @IsString()
  readonly interest?: string;
  @IsString()
  @IsNotEmpty()
  readonly nationality: string;
  @IsString()
  @IsNotEmpty()
  readonly religion: string;
  @IsString()
  readonly organisation?: string;
  @IsString()
  readonly projectManagingProjectId?: string;
  @IsString()
  readonly type?: string;
  @IsNumber()
  @IsNotEmpty()
  readonly accessLevel?: number;
}

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
