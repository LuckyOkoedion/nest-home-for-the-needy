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
