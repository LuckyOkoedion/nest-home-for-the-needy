import { Document } from 'mongoose';

export interface IResident extends Document {
  readonly firstName: string;
  readonly lastName: string;
  readonly otherName: string;
  readonly gender: string;
  readonly maritalStatus: string;
  readonly campHouseId?: string;
  readonly gallery: [
    {
      readonly _id: string;
      readonly picture: string;
      readonly pictureName: string;
      readonly dateCaptured: string;
      readonly peopleInPictureUserId: [string];
      readonly occassionCaptured: string;
      readonly approved: boolean;
    },
  ];
  readonly countryOfOrigin: string;
  readonly stateOfOrigin: string;
  readonly localGovtOfOrigin: string;
  readonly dateOfBirth: Date;
  readonly placeOfBirth: string;
  readonly historyOfArrival: string;
  readonly dateOfArrival: Date;
  readonly public: boolean;
  readonly relatedCoResident?: [
    {
      readonly _id: string;
      readonly relativeUserId: string;
      readonly relationship: string;
    },
  ];
  readonly personalSponsor?: [
    {
      readonly _id: string;
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
  readonly currentBenefits: {
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
