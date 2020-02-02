import { Document } from "mongoose";

export interface INavFooter extends Document {
  readonly brandName: string;
  readonly nav: [
    {
      readonly name: string;
      readonly link: string;
    }
  ];
  readonly aboutUsTitle: string;
  readonly aboutUsText: string;
  readonly twitterLink: string;
  readonly facebookLink: string;
  readonly instagramLink: string;
  readonly recentBlogTitle: string;
  readonly officeAddress: string;
  readonly phoneNo: string;
  readonly email: string;
}
