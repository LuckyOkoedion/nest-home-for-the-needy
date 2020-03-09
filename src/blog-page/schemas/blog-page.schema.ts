import { prop, mongoose } from '@typegoose/typegoose';
import { IsString } from 'class-validator';

export class BlogPage {
  @prop({ default: new mongoose.Types.ObjectId() })
  _id: mongoose.Schema.Types.ObjectId;
  @IsString()
  @prop({ required: true })
  bigText: string;
}

