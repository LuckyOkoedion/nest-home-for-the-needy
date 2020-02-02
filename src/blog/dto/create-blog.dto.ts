import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsBoolean,
  IsObject,
  IsArray,
} from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  readonly authorUserId: string;
  @IsString()
  @IsNotEmpty()
  readonly title: string;
  @IsString()
  @IsNotEmpty()
  readonly category: string;
  @IsString()
  @IsNotEmpty()
  readonly pic: string;
  @IsString()
  @IsNotEmpty()
  readonly body: string;
  @IsBoolean()
  readonly approved?: Boolean;
  @IsObject()
  readonly approvedByUserId?: string;
  @IsDate()
  @IsNotEmpty()
  readonly timestamp: Date;
  @IsArray()
  readonly comments?: BlogCommentDto[];
}

export class BlogCommentDto {
  @IsObject()
  @IsNotEmpty()
  readonly commenterUserId: string;
  @IsString()
  @IsNotEmpty()
  readonly comment: string;
  @IsDate()
  @IsNotEmpty()
  readonly time: Date;
  @IsBoolean()
  @IsNotEmpty()
  readonly hide: Boolean;
}
