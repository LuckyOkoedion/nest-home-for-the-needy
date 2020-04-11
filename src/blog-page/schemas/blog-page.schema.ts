import { prop, mongoose } from '@typegoose/typegoose';
import { IsString } from 'class-validator';

export class BlogPage {
  @IsString()
  @prop({ required: true })
  bigText: string;
}

