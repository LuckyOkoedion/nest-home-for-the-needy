import { IsString } from 'class-validator';
import { prop, mongoose } from '@typegoose/typegoose';

export class HomePage {
  @IsString()
  @prop({
    required: true,
  })
  bigText!: string;
  @IsString()
  @prop({
    required: true,
  })
  bannerPic!: string;
  @IsString()
  @prop({
    required: true,
  })
  ourCauses!: string;
}
