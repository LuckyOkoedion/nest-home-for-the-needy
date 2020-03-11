import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';

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
  @IsOptional()
  @IsString()
  readonly bigText?: string;
  @IsOptional()
  @IsString()
  readonly bannerPic?: string;
  @IsOptional()
  @IsString()
  readonly ourCauses?: string;
}
