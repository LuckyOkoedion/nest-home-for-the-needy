import { IsNotEmpty, IsString, IsDate, IsObject, IsOptional } from 'class-validator';

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
  @IsDate()
  readonly timestamp: Date;
}

export class EditBlogDto {
  @IsOptional()
  @IsString()
  readonly title?: string;
  @IsOptional()
  @IsString()
  readonly category?: string;
  @IsOptional()
  @IsString()
  readonly pic?: string;
  @IsOptional()
  @IsString()
  readonly body?: string;
  @IsOptional()
  @IsDate()
  readonly timestamp?: Date;
}

export class CreateBlogWithoutPicDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;
  @IsString()
  @IsNotEmpty()
  readonly category: string;
  @IsString()
  @IsNotEmpty()
  readonly body: string;
  readonly timestamp: Date;
}

export class BlogCommentDto {
  @IsNotEmpty()
  readonly _id: any;
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


export class BlogDto {
  readonly _id: string;
  readonly authorUserId!: string;
  readonly title!: string;
  readonly category!: string;
  readonly pic!: string;
  readonly body!: string;
  readonly timestamp!: Date;
  readonly comments: [];
  readonly approved!: Boolean;
  readonly approvedBy!: string;
}
