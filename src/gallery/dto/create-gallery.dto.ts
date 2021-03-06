import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsArray,
  IsDate,
  IsOptional,
} from 'class-validator';

export class CreateGalleryDto {
  @IsString()
  @IsNotEmpty()
  readonly picture: string;
  @IsDate()
  @IsNotEmpty()
  readonly dateCaptured: Date;
  @IsOptional()
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
  @IsDate()
  @IsNotEmpty()
  readonly dateCaptured: Date;
  @IsOptional()
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
  @IsOptional()
  @IsString()
  readonly picture?: string;
  @IsOptional()
  @IsDate()
  readonly dateCaptured?: Date;
  @IsOptional()
  @IsArray()
  readonly peopleInPictureUserId?: string[];
  @IsOptional()
  @IsString()
  readonly occassionCaptured?: string;
  @IsOptional()
  @IsBoolean()
  readonly approved?: Boolean;
}
