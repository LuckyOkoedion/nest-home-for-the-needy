import * as mongoose from 'mongoose';

export const ResidentSchema = new mongoose.Schema({
    _id:  {
      type: mongoose.Schema.Types.ObjectId,
      default: new mongoose.Types.ObjectId(),
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    otherName: { type: String, required: true },
    gender: { type: String, required: true },
    maritalStatus: { type: String, required: true },
    gallery: [
      {
        picture: { type: String, required: true },
        pictureName: { type: String, required: true },
        dateCaptured: { type: String, required: true },
        peopleInPicture: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
          }
        ],
        occassionCaptured: { type: String, required: true },
        approved: { type: Boolean, default: false }
      }
    ],
    countryOfOrigin: { type: String, required: true },
    stateOfOrigin: { type: String, required: true },
    localGovtOfOrigin: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    placeOfBirth: { type: String, required: true },
    historyOfArrival: { type: String, required: true },
    dateOfArrival: { type: Date, required: true },
    public: { type: Boolean, default: false },
    relatedCoResident: [
      {
        relative: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true
        },
        relationship: { type: String, required: true }
      }
    ],
    personalSponsor: [
      {
        sponsor: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true
        },
        purposeOfSponsorship: { type: String, required: true },
        donations: [
          {
            lastDonationDate: { type: Date, required: true },
            amount: { type: Number, required: true }
          }
        ],
        statusOfSponsorship: { type: String }
      }
    ],
    currentBenefits: {
      education: {
        primaryOrJuniorSecSchool: {
          class: { type: String, required: true },
          lastPositionInClass: { type: Number, required: true },
          classSize: { type: Number, required: true }
        },
        seniorOrSecondarySchool: {
          class: { type: String, required: true },
          specialty: { type: String, required: true },
          careerChoice: { type: String }
        }
      },
      feeding: { type: Boolean, required: true },
      accommodation: { type: Boolean, required: true },
      clothing: { type: Boolean, required: true }
    }
  });