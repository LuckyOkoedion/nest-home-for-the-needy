import * as mongoose from 'mongoose';

export const HomePageSchema = new mongoose.Schema({
    bigText: {type: String, required: true},
    bannerPic: {type: String, required: true},
    ourCauses: String
});