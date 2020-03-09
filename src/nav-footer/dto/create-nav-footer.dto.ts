import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export class CreateNavFooterDto {
  @IsString()
  @IsNotEmpty()
  readonly brandName: string;
  @IsArray()
  @IsNotEmpty()
  readonly nav: CreateNavDto[];
  @IsString()
  @IsNotEmpty()
  readonly aboutUsTitle: string;
  @IsString()
  @IsNotEmpty()
  readonly aboutUsText: string;
  @IsString()
  @IsNotEmpty()
  readonly twitterLink: string;
  @IsString()
  @IsNotEmpty()
  readonly facebookLink: string;
  @IsString()
  @IsNotEmpty()
  readonly instagramLink: string;
  @IsString()
  @IsNotEmpty()
  readonly recentBlogTitle: string;
  @IsString()
  @IsNotEmpty()
  readonly officeAddress: string;
  @IsString()
  @IsNotEmpty()
  readonly phoneNo: string;
  @IsString()
  @IsNotEmpty()
  readonly email: string;
}

export class CreateNavDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly link: string;
}
