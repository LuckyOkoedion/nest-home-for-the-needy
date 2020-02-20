import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  _id:  {
    type: mongoose.Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId(),
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String },
  dateOfBirth: { type: Date },
  email: { type: String, required: true },
  hasVerifiedEmail: { type: Boolean, default: false },
  phoneNo: { type: String, required: true },
  password: { type: String, required: true },
  ipAddressess: [],
  pageVisits: [
    {
      homePage: { type: Number },
      aboutPage: { type: Number },
      contactPage: { type: Number },
      donatePage: { type: Number },
      eventsPage: { type: Number },
      blogPage: { type: Number },
      projectsPage: { type: Number },
    },
  ],
  interest: { type: String },
  nationality: { type: String },
  religion: { type: String },
  organisation: { type: String },
  projectManaging: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },
  type: { type: String },
  accessLevel: { type: Number, default: 5 },
});
