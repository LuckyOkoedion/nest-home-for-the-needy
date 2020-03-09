import { prop, mongoose, arrayProp, Ref } from '@typegoose/typegoose';
import {
  IsString,
  IsDate,
  IsBoolean,
  IsArray,
  IsObject,
  IsNumber,
} from 'class-validator';
import { User } from 'src/user/schemas/user.schema';

export class ResidentGallery {
  @IsString()
  @prop({ default: new mongoose.Types.ObjectId() })
  _id: string;

  @IsString()
  @prop({
    required: true,
  })
  title!: string;

  @IsString()
  @prop({
    required: true,
  })
  picture!: string;

  @IsString()
  @prop({
    required: true,
  })
  pictureName!: string;
  @IsString()
  @prop({
    required: true,
  })
  occassionCaptured!: string;
  @IsDate()
  @prop({
    required: true,
  })
  dateCaptured!: Date;
  @IsBoolean()
  @prop({
    default: true,
  })
  approved!: boolean;
}

export class RelatedCoResident {
  @IsString()
  @prop({ default: new mongoose.Types.ObjectId() })
  _id: string;
  @prop({
    ref: 'User',
    required: true,
  })
  relativeUserId!: Ref<User>;
  @IsString()
  @prop({
    required: true,
  })
  relationship!: string;
}

export class PersonalSponsor {
  @IsString()
  @prop({ default: new mongoose.Types.ObjectId() })
  _id: string;
  @prop({
    ref: 'User',
    required: true,
  })
  sponsorUserId!: Ref<User>;
  @IsString()
  @prop({
    required: true,
  })
  purposeOfSponsorship!: string;
  @IsString()
  @prop()
  statusOfSponsorship: string;
}

export class PrimaryOrJuniorSecSchool {
  @IsString()
  @prop({
    required: true,
  })
  schoolClass: string;
  @IsNumber()
  @prop({
    required: true,
  })
  lastPositionInClass!: number;
  @IsNumber()
  @prop({
    required: true,
  })
  classSize!: number;
}

export class SeniorSecSchool {
  @IsString()
  @prop({
    required: true,
  })
  schoolClass!: string;
  @IsString()
  @prop({
    required: true,
  })
  specialty!: string;
  @IsString()
  @prop()
  careerChoice: string;
}

export class Tertiary {
  @IsString()
  @prop({
    required: true,
  })
  schoolClass!: string;
  @IsString()
  @prop({
    required: true,
  })
  course!: string;
}

export class EducationBenefit {
  @IsObject()
  @prop()
  primaryOrJuniorSecSchool?: PrimaryOrJuniorSecSchool;
  @IsObject()
  @prop()
  seniorSecSchool?: SeniorSecSchool;
  @IsObject()
  @prop()
  tertiary?: Tertiary;
}

export class CurrentBenefits {
  @IsObject()
  @prop()
  education?: EducationBenefit;
  @IsBoolean()
  @prop({
    required: true,
  })
  feeding: boolean;
  @IsBoolean()
  @prop({
    required: true,
  })
  accommodation: boolean;
  @IsBoolean()
  @prop({
    required: true,
  })
  clothing: boolean;
}

export class Resident {
  @prop({ default: new mongoose.Types.ObjectId() })
  _id: mongoose.Schema.Types.ObjectId;
  @IsString()
  @prop({
    required: true,
  })
  firstName!: string;
  @IsString()
  @prop({
    required: true,
  })
  lastName!: string;
  @IsString()
  @prop({
    required: true,
  })
  otherName!: string;
  @IsString()
  @prop({
    required: true,
  })
  gender!: string;
  @IsString()
  @prop({
    required: true,
  })
  maritalStatus!: string;
  @IsArray()
  @arrayProp({ items: ResidentGallery })
  gallery: ResidentGallery[];
  @IsString()
  @prop({
    required: true,
  })
  countryOfOrigin!: string;
  @IsString()
  @prop({
    required: true,
  })
  stateOfOrigin!: string;
  @IsString()
  @prop({
    required: true,
  })
  localGovtOfOrigin!: string;
  @IsDate()
  @prop({
    required: true,
  })
  dateOfBirth: Date;
  @IsString()
  @prop({
    required: true,
  })
  placeOfBirth: string;
  @IsString()
  @prop({
    required: true,
  })
  historyOfArrival: string;
  @IsDate()
  @prop({
    required: true,
  })
  dateOfArrival!: Date;
  @IsBoolean()
  @prop({
    default: false,
  })
  makePublic: boolean;
  @IsArray()
  @arrayProp({ items: RelatedCoResident })
  relatedCoResident: RelatedCoResident[];
  @IsArray()
  @arrayProp({ items: PersonalSponsor })
  personalSponsor: PersonalSponsor[];
  @IsObject()
  @prop()
  currentBenefits: CurrentBenefits;
}
