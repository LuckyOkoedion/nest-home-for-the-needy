import { IsNotEmpty, IsString, IsDate, IsObject } from 'class-validator';

export class CreateBlogDto {
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
  readonly timestamp: Date;
}

export class BlogCommentDto {
  @IsObject()
  @IsNotEmpty()
  readonly comment: Object;
  @IsDate()
  @IsNotEmpty()
  readonly time: Date;
  @IsString()
  @IsNotEmpty()
  readonly commenterUserId: string;
}
