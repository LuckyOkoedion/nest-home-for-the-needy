import * as mongoose from 'mongoose';

export const EventSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId(),
  },
  eventName: { type: String, required: true },
  eventDescription: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  host: { type: String, required: true },
  venue: { type: String, required: true },
  eventManager: {
    name: { type: String, required: true },
    phoneNo: { type: String, required: true },
    email: { type: String, required: true },
  },
  invitees: [
    {
      name: { type: String, required: true },
      phoneNo: { type: String, required: true },
      email: { type: String, required: true },
      rsvp: { type: Boolean, default: false },
      declined: { type: Boolean, default: false },
    },
  ],
});
