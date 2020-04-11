import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsDate,
  IsBoolean,
  IsObject,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateResidentGalleryDto {
  @IsString()
  readonly picture!: string;
  @IsString()
  readonly occassionCaptured!: string;
  @IsDate()
  readonly dateCaptured!: Date;
  @IsOptional()
  @IsBoolean()
  readonly approved?: boolean;
}

export class CreateRelatedCoResidentDto {
  @IsString()
  readonly relativeUserId!: string;
  @IsString()
  readonly relationship!: string;
}

export class EditRelatedCoResidentDto {
  @IsOptional()
  @IsString()
  readonly relativeUserId?: string;
  @IsOptional()
  @IsString()
  readonly relationship?: string;
}

export class CreatePersonalSponsorDto {
  @IsString()
  readonly sponsorUserId!: string;
  @IsString()
  readonly purposeOfSponsorship!: string;
  @IsString()
  readonly statusOfSponsorship: string;
}

export class EditPersonalSponsorDto {
  @IsOptional()
  @IsString()
  readonly sponsorUserId?: string;
  @IsOptional()
  @IsString()
  readonly purposeOfSponsorship?: string;
  @IsOptional()
  @IsString()
  readonly statusOfSponsorship?: string;
}

export class PrimaryOrJuniorSecSchoolDto {
  @IsString()
  readonly schoolClass: string;
  @IsNumber()
  readonly lastPositionInClass!: number;
  @IsNumber()
  readonly classSize!: number;
}

export class SeniorSecSchoolDto {
  @IsString()
  readonly schoolClass!: string;
  @IsString()
  readonly specialty!: string;
  @IsString()
  readonly careerChoice: string;
}

export class TertiaryDto {
  @IsString()
  readonly schoolClass!: string;
  @IsString()
  readonly course!: string;
}

export class EducationBenefitDto {
  @IsOptional()
  @IsObject()
  readonly primaryOrJuniorSecSchool?: PrimaryOrJuniorSecSchoolDto;
  @IsOptional()
  @IsObject()
  readonly seniorSecSchool?: SeniorSecSchoolDto;
  @IsOptional()
  @IsObject()
  readonly tertiary?: TertiaryDto;
}

export class CurrentBenefitsDto {
  @IsOptional()
  @IsObject()
  readonly education?: EducationBenefitDto;
  @IsBoolean()
  readonly feeding: boolean;
  @IsBoolean()
  readonly accommodation: boolean;
  @IsBoolean()
  readonly clothing: boolean;
}

export class CreateResidentDto {
  @IsString()
  readonly firstName!: string;
  @IsString()
  readonly lastName!: string;
  @IsString()
  readonly otherName!: string;
  @IsString()
  readonly gender!: string;
  @IsString()
  readonly maritalStatus!: string;
  @IsArray()
  readonly gallery: CreateResidentGalleryDto[];
  @IsString()
  readonly countryOfOrigin!: string;
  @IsString()
  readonly nationalId?: string;
  @IsString()
  readonly bvn?: string;
  @IsString()
  readonly bloodGroup?: string;
  @IsString()
  readonly genotype?: string;
  @IsString()
  readonly physicalOrHealthChallenge?: string;
  @IsString()
  readonly criminalRecord?: string;
  @IsString()
  readonly stateOfOrigin!: string;
  @IsString()
  readonly localGovtOfOrigin!: string;
  @IsDate()
  readonly dateOfBirth: Date;
  @IsString()
  readonly placeOfBirth: string;
  @IsString()
  readonly historyOfArrival: string;
  @IsDate()
  readonly dateOfArrival!: Date;
  @IsBoolean()
  readonly makePublic: boolean;
  @IsArray()
  readonly relatedCoResident: CreateRelatedCoResidentDto[];
  @IsArray()
  readonly personalSponsor: CreatePersonalSponsorDto[];
  @IsObject()
  readonly currentBenefits: CurrentBenefitsDto;
}

export class ResidentWithoutArraysDto {
  @IsString()
  readonly firstName!: string;
  @IsString()
  readonly lastName!: string;
  @IsString()
  readonly otherName!: string;
  @IsString()
  readonly gender!: string;
  @IsString()
  readonly maritalStatus!: string;
  @IsString()
  readonly countryOfOrigin!: string;
  @IsString()
  readonly nationalId?: string;
  @IsString()
  readonly bvn?: string;
  @IsString()
  readonly bloodGroup?: string;
  @IsString()
  readonly genotype?: string;
  @IsString()
  readonly physicalOrHealthChallenge?: string;
  @IsString()
  readonly criminalRecord?: string;
  @IsString()
  readonly stateOfOrigin!: string;
  @IsString()
  readonly localGovtOfOrigin!: string;
  @IsDate()
  readonly dateOfBirth: Date;
  @IsString()
  readonly placeOfBirth: string;
  @IsString()
  readonly historyOfArrival: string;
  @IsDate()
  readonly dateOfArrival!: Date;
  @IsBoolean()
  readonly makePublic: boolean;
  @IsObject()
  readonly currentBenefits: CurrentBenefitsDto;

}


export class EditResidentDto {
  @IsOptional()
  @IsString()
  readonly firstName?: string;
  @IsOptional()
  @IsString()
  readonly lastName?: string;
  @IsOptional()
  @IsString()
  readonly otherName?: string;
  @IsOptional()
  @IsString()
  readonly gender?: string;
  @IsOptional()
  @IsString()
  readonly maritalStatus?: string;
  @IsOptional()
  @IsArray()
  readonly gallery?: CreateResidentGalleryDto[];
  @IsString()
  @IsOptional()
  readonly countryOfOrigin?: string;
  @IsString()
  @IsOptional()
  readonly nationalId?: string;
  @IsOptional()
  @IsString()
  readonly bvn?: string;
  @IsOptional()
  @IsString()
  readonly bloodGroup?: string;
  @IsOptional()
  @IsString()
  readonly genotype?: string;
  @IsString()
  @IsOptional()
  readonly stateOfOrigin?: string;
  @IsOptional()
  @IsString()
  readonly localGovtOfOrigin?: string;
  @IsOptional()
  @IsDate()
  readonly dateOfBirth?: Date;
  @IsOptional()
  @IsString()
  readonly placeOfBirth?: string;
  @IsOptional()
  @IsString()
  readonly historyOfArrival?: string;
  @IsOptional()
  @IsDate()
  readonly dateOfArrival?: Date;
  @IsOptional()
  @IsBoolean()
  readonly makePublic?: boolean;
  @IsOptional()
  @IsArray()
  readonly relatedCoResident?: CreateRelatedCoResidentDto[];
  @IsOptional()
  @IsArray()
  readonly personalSponsor?: CreatePersonalSponsorDto[];
  @IsOptional()
  @IsObject()
  readonly currentBenefits?: CurrentBenefitsDto;
}

export class CreateResidentGalleryWithoutPicDto {
  @IsString()
  readonly title: string;
  @IsString()
  readonly pictureName!: string;
  @IsString()
  readonly occassionCaptured!: string;
  @IsDate()
  readonly dateCaptured!: Date;
  @IsBoolean()
  readonly approved!: boolean;

}


