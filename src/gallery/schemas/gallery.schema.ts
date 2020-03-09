import { prop, mongoose, arrayProp, Ref } from '@typegoose/typegoose';
import { IsString, IsDate, IsBoolean, IsArray } from 'class-validator';
import { User } from 'src/user/schemas/user.schema';

export class ThePeopleInPicture {
  @prop({
    ref: 'User',
    required: true,
  })
  authorUserId!: Ref<User>;
}

export class Gallery {
  @prop({ default: new mongoose.Types.ObjectId() })
  _id: mongoose.Schema.Types.ObjectId;
  @IsString()
  @prop({ required: true })
  picture: string;
  @IsString()
  @prop({ required: true })
  pictureName: string;
  @IsDate()
  @prop({ required: true })
  dateCaptured: Date;
  @IsString()
  @prop({ required: true })
  occassionCaptured: string;
  @IsBoolean()
  @prop({ default: false })
  approved: string;
  @IsArray()
  @arrayProp({ items: ThePeopleInPicture })
  peopleInPicture: ThePeopleInPicture[];
}
