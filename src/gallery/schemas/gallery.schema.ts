import * as mongoose from 'mongoose';

export const GallerySchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId(),
  },
  picture: { type: String, required: true },
  pictureName: { type: String, required: true },
  dateCaptured: { type: String, required: true },
  peopleInPicture: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  ],
  occassionCaptured: { type: String, required: true },
  approved: { type: Boolean, default: false },
});
