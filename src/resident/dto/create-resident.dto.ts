import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsDate,
  IsBoolean,
  IsObject,
} from 'class-validator';

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
      readonly dateCaptured: string;
      readonly peopleInPictureUserId: [string];
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
      readonly primaryOrJuniorSecSchool: {
        readonly class: string;
        readonly lastPositionInClass: number;
        readonly classSize: number;
      };
      readonly seniorOrSecondarySchool: {
        readonly class: string;
        readonly specialty: string;
        readonly careerChoice: string;
      };
    };
    readonly feeding: boolean;
    readonly accommodation: boolean;
    readonly clothing: boolean;
  };
}
