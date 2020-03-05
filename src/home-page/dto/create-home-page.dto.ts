import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateHomePageDto {
  @IsString()
  @IsNotEmpty()
  readonly bigText: string;
  @IsString()
  @IsNotEmpty()
  readonly bannerPic: string;
  @IsString()
  @IsNotEmpty()
  readonly ourCauses: string;
}

export class HomePageWithoutPicDto {
  @IsString()
  @IsNotEmpty()
  readonly bigText: string;
  @IsString()
  @IsNotEmpty()
  readonly ourCauses: string;
}

export class EditHomePageDto {
  @IsString()
  readonly bigText?: string;
  @IsString()
  readonly bannerPic?: string;
  @IsString()
  readonly ourCauses?: string;
}
