import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsDate,
  IsBoolean,
  IsObject,
} from 'class-validator';

export class ResidentWithoutArraysDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;
  @IsString()
  @IsNotEmpty()
  readonly otherName: string;
  @IsString()
  @IsNotEmpty()
  readonly gender: string;
  @IsString()
  @IsNotEmpty()
  readonly maritalStatus: string;
  @IsString()
  readonly campHouseId?: string;
  @IsString()
  @IsNotEmpty()
  readonly countryOfOrigin: string;
  @IsString()
  @IsNotEmpty()
  readonly stateOfOrigin: string;
  @IsString()
  @IsNotEmpty()
  readonly localGovtOfOrigin: string;
  @IsDate()
  @IsNotEmpty()
  readonly dateOfBirth: Date;
  @IsString()
  @IsNotEmpty()
  readonly placeOfBirth: string;
  @IsString()
  @IsNotEmpty()
  readonly historyOfArrival: string;
  @IsDate()
  @IsNotEmpty()
  readonly dateOfArrival: Date;
  @IsBoolean()
  @IsNotEmpty()
  readonly public: boolean;
  @IsArray()
  readonly personalSponsor?: [{}];
  @IsObject()
  readonly currentBenefits?: {
    readonly education?: {
      readonly primaryOrJuniorSecSchool?: {
        readonly class: string;
        readonly lastPositionInClass: number;
        readonly classSize: number;
      };
      readonly seniorOrSecondarySchool?: {
        readonly class: string;
        readonly specialty: string;
        readonly careerChoice: string;
      };
      readonly tertiary?: {
        readonly class: string;
        readonly course: string;
      };
    };
    readonly feeding: boolean;
    readonly accommodation: boolean;
    readonly clothing: boolean;
  };
}

export class RelatedCoResidentDto {
  readonly id?: string;
  readonly relativeUserId: string;
  readonly relationship: string;
}

export class PersonalSponsorDto {
  readonly id?: string;
  readonly sponsorUserId: string;
  readonly purposeOfSponsorship: string;
  readonly statusOfSponsorship: string;
}

export class CreateResidentDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;
  @IsString()
  @IsNotEmpty()
  readonly otherName: string;
  @IsString()
  @IsNotEmpty()
  readonly gender: string;
  @IsString()
  @IsNotEmpty()
  readonly maritalStatus: string;
  @IsString()
  readonly campHouseId?: string;
  @IsArray()
  @IsNotEmpty()
  readonly gallery?: [
    {
      readonly picture: string;
      readonly pictureName: string;
      readonly dateCaptured: Date;
      readonly occassionCaptured: string;
      readonly approved: boolean;
    },
  ];
  @IsString()
  @IsNotEmpty()
  readonly countryOfOrigin: string;
  @IsString()
  @IsNotEmpty()
  readonly stateOfOrigin: string;
  @IsString()
  @IsNotEmpty()
  readonly localGovtOfOrigin: string;
  @IsDate()
  @IsNotEmpty()
  readonly dateOfBirth: Date;
  @IsString()
  @IsNotEmpty()
  readonly placeOfBirth: string;
  @IsString()
  @IsNotEmpty()
  readonly historyOfArrival: string;
  @IsDate()
  @IsNotEmpty()
  readonly dateOfArrival: Date;
  @IsBoolean()
  @IsNotEmpty()
  readonly public: boolean;
  @IsArray()
  readonly relatedCoResident?: [
    {
      readonly relativeUserId: string;
      readonly relationship: string;
    },
  ];
  @IsArray()
  readonly personalSponsor?: [
    {
      readonly sponsorUserId: string;
      readonly purposeOfSponsorship: string;
      readonly statusOfSponsorship: string;
    },
  ];
  @IsObject()
  readonly currentBenefits?: {
    readonly education?: {
      readonly primaryOrJuniorSecSchool?: {
        readonly class: string;
        readonly lastPositionInClass: number;
        readonly classSize: number;
      };
      readonly seniorOrSecondarySchool?: {
        readonly class: string;
        readonly specialty: string;
        readonly careerChoice: string;
      };
      readonly tertiary?: {
        readonly class: string;
        readonly course: string;
      };
    };
    readonly feeding: boolean;
    readonly accommodation: boolean;
    readonly clothing: boolean;
  };
}

export class EditResidentDto {
  @IsString()
  readonly firstName?: string;
  @IsString()
  readonly lastName?: string;
  @IsString()
  readonly otherName?: string;
  @IsString()
  readonly gender?: string;
  @IsString()
  readonly maritalStatus?: string;
  @IsString()
  readonly campHouseId?: string;
  @IsArray()
  readonly gallery?: [
    {
      readonly picture: string;
      readonly pictureName: string;
      readonly dateCaptured: Date;
      readonly occassionCaptured: string;
      readonly approved: boolean;
    },
  ];
  @IsString()
  readonly countryOfOrigin?: string;
  @IsString()
  readonly stateOfOrigin?: string;
  @IsString()
  readonly localGovtOfOrigin?: string;
  @IsDate()
  readonly dateOfBirth?: Date;
  @IsString()
  readonly placeOfBirth?: string;
  @IsString()
  readonly historyOfArrival?: string;
  @IsDate()
  readonly dateOfArrival?: Date;
  @IsBoolean()
  readonly public?: boolean;
  @IsArray()
  readonly relatedCoResident?: [
    {
      readonly relativeUserId: string;
      readonly relationship: string;
    },
  ];
  @IsArray()
  readonly personalSponsor?: [
    {
      readonly sponsorUserId: string;
      readonly purposeOfSponsorship: string;
      readonly donations: [
        {
          readonly lastDonationDate: Date;
          readonly amount: number;
        },
      ];
      readonly statusOfSponsorship: string;
    },
  ];
  @IsObject()
  readonly currentBenefits?: {
    readonly education: {
      readonly primaryOrJuniorSecSchool?: {
        readonly class: string;
        readonly lastPositionInClass: number;
        readonly classSize: number;
      };
      readonly seniorOrSecondarySchool?: {
        readonly class: string;
        readonly specialty: string;
        readonly careerChoice: string;
      };
      readonly tertiary?: {
        readonly class: string;
        readonly course: string;
      };
    };
    readonly feeding: boolean;
    readonly accommodation: boolean;
    readonly clothing: boolean;
  };
}

export class createResidentGalleryWithoutPicDto {
  readonly pictureName: string;
  readonly dateCaptured?: Date;
  readonly occassionCaptured: string;
  readonly approved?: boolean;
}

export class createResidentGalleryDto {
  readonly id?: string;
  readonly picture: string;
  readonly pictureName: string;
  readonly dateCaptured?: Date;
  readonly occassionCaptured: string;
  readonly approved?: boolean;
}
