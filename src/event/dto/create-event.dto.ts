import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsObject,
  IsBoolean,
  IsArray,
  IsOptional,
} from 'class-validator';

export class CreateEventManagerDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly phoneNo: string;
  @IsString()
  @IsNotEmpty()
  readonly email: string;
}

export class CreateInviteesDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly phoneNo: string;
  @IsString()
  @IsNotEmpty()
  readonly email: string;
  @IsBoolean()
  @IsNotEmpty()
  readonly rsvp: Boolean;
  @IsBoolean()
  @IsNotEmpty()
  readonly declined: Boolean;
}

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  readonly eventName: string;
  @IsString()
  @IsNotEmpty()
  readonly eventDescription: string;
  @IsDate()
  @IsNotEmpty()
  readonly startDate: Date;
  @IsDate()
  @IsNotEmpty()
  readonly endDate: Date;
  @IsString()
  @IsNotEmpty()
  readonly host: string;
  @IsString()
  @IsNotEmpty()
  readonly venue: string;
  @IsOptional()
  @IsObject()
  @IsNotEmpty()
  readonly eventManager?: CreateEventManagerDto;
  @IsOptional()
  @IsArray()
  readonly invitees?: CreateInviteesDto[];
}
