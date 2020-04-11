import { prop, Ref, arrayProp, mongoose } from '@typegoose/typegoose';
import { IsString, IsDate, IsBoolean } from 'class-validator';
import { User } from 'src/user/schemas/user.schema';

export class Comment {
  @IsString()
  @prop()
  _id: string;
  @prop({
    ref: 'User',
    required: true,
  })
  commenterUserId!: Ref<User>;
  @IsString()
  @prop({
    required: true,
  })
  comment!: string;
  @IsDate()
  @prop({
    required: true,
  })
  time!: Date;
  @IsBoolean()
  @prop({
    default: false,
  })
  hide!: Boolean;
  @IsBoolean()
  @prop({
    default: false,
  })
  edited!: Boolean;
}

export class Blog {
  @prop({
    ref: 'User',
    required: true,
  })
  authorUserId!: Ref<User>;
  @IsString()
  @prop({
    required: true,
  })
  title!: string;
  @IsString()
  @prop({
    required: true,
  })
  category!: string;
  @IsString()
  @prop({
    required: true,
  })
  pic!: string;
  @IsString()
  @prop({
    required: true,
  })
  body!: string;
  @IsDate()
  @prop({
    required: true,
  })
  timestamp!: Date;
  @arrayProp({ items: Comment })
  comments: Comment[];
  @IsBoolean()
  @prop({
    default: false,
  })
  approved!: Boolean;
  @prop({
    ref: 'User',
  })
  approvedBy?: Ref<User>;
}
