import { IsNotEmpty, IsString, IsBoolean, IsArray } from 'class-validator';

export class CreateGalleryDto {
  @IsString()
  @IsNotEmpty()
  readonly picture: string;
  @IsString()
  @IsNotEmpty()
  readonly pictureName: string;
  @IsString()
  @IsNotEmpty()
  readonly dateCaptured: string;
  @IsArray()
  readonly peopleInPictureUserId?: string[];
  @IsString()
  @IsNotEmpty()
  readonly occassionCaptured: string;
  @IsBoolean()
  @IsNotEmpty()
  readonly approved: Boolean;
}
