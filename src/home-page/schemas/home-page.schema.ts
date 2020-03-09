import { IsString } from 'class-validator';
import { prop, mongoose } from '@typegoose/typegoose';

export class HomePage {
  @prop({ default: new mongoose.Types.ObjectId() })
  _id: mongoose.Schema.Types.ObjectId;

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
