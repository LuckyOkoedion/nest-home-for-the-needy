import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsArray,
  IsDate,
} from 'class-validator';

export class CreateGalleryDto {
  @IsString()
  @IsNotEmpty()
  readonly picture: string;
  @IsString()
  @IsNotEmpty()
  readonly pictureName: string;
  @IsDate()
  @IsNotEmpty()
  readonly dateCaptured: Date;
  @IsArray()
  readonly peopleInPictureUserId?: string[];
  @IsString()
  @IsNotEmpty()
  readonly occassionCaptured: string;
  @IsBoolean()
  @IsNotEmpty()
  readonly approved: Boolean;
}

export class CreateGalleryWithoutPicDto {
  @IsString()
  @IsNotEmpty()
  readonly pictureName: string;
  @IsDate()
  @IsNotEmpty()
  readonly dateCaptured: Date;
  @IsArray()
  readonly peopleInPictureUserId?: string[];
  @IsString()
  @IsNotEmpty()
  readonly occassionCaptured: string;
  @IsBoolean()
  @IsNotEmpty()
  readonly approved: Boolean;
}

export class EditGalleryDto {
  @IsString()
  readonly picture?: string;
  @IsString()
  readonly pictureName?: string;
  @IsDate()
  readonly dateCaptured?: Date;
  @IsArray()
  readonly peopleInPictureUserId?: string[];
  @IsString()
  readonly occassionCaptured?: string;
  @IsBoolean()
  readonly approved?: Boolean;
}
