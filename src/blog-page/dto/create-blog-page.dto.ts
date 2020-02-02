import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBlogPageDto {
  @IsString()
  @IsNotEmpty()
  readonly bigText: string;
}
