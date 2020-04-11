import { prop, mongoose, arrayProp } from '@typegoose/typegoose';
import { IsString, IsArray, IsPhoneNumber, IsEmail } from 'class-validator';

export class TheNav {
  @IsString()
  @prop({
    required: true,
  })
  name!: string;
  @IsString()
  @prop({
    required: true,
  })
  link!: string;
}

export class NavFooter {
  @IsString()
  @prop({
    required: true,
  })
  brandName!: string;
  @IsArray()
  @arrayProp({ items: TheNav })
  nav: TheNav[];
  @IsString()
  @prop({
    required: true,
  })
  aboutUsTitle!: string;
  @IsString()
  @prop({
    required: true,
  })
  aboutUsText!: string;
  @IsString()
  @prop({
    required: true,
  })
  twitterLink!: string;
  @IsString()
  @prop({
    required: true,
  })
  facebookLink!: string;
  @IsString()
  @prop({
    required: true,
  })
  instagramLink!: string;
  @IsString()
  @prop({
    required: true,
  })
  recentBlogTitle!: string;
  @IsString()
  @prop({
    required: true,
  })
  officeAddress!: string;
  @IsString()
  @prop({
    required: true,
  })
  phoneNO!: string;
  @IsEmail()
  @prop({
    required: true,
  })
  email!: string;
}
