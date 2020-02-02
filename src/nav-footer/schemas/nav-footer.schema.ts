import * as mongoose from 'mongoose';

export const NavFooterSchema = new mongoose.Schema({
    brandName: { type: String, required: true },
    nav: [
      {
        name: { type: String, required: true },
        link: { type: String, required: true }
      }
    ],
    aboutUsTitle: { type: String, required: true },
    aboutUsText: { type: String, required: true },
    twitterLink: { type: String, required: true },
    facebookLink: { type: String, required: true },
    instagramLink: { type: String, required: true },
    recentBlogTitle: { type: String, required: true },
    officeAddress: { type: String, required: true },
    phoneNo: { type: String, required: true },
    email: { type: String, required: true }
  });