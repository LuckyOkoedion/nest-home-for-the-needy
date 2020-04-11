import { Injectable } from '@nestjs/common';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { InjectModel } from "nestjs-typegoose";
import { ReturnModelType } from '@typegoose/typegoose';
import { Gallery } from './schemas/gallery.schema';

@Injectable()
export class GalleryService {
  constructor(
    @InjectModel(Gallery) private readonly GalleryModel: ReturnModelType<typeof Gallery>,
  ) { }
  async uploadPicture(picture: CreateGalleryDto) {
    const createdPicture = await new this.GalleryModel(picture);
    return createdPicture.save();
  }

  async getAllPictures() {
    return await this.GalleryModel.find().exec();
  }

  async getPictureDetail(pictureId): Promise<Gallery> {
    return await this.GalleryModel.findById(pictureId).exec();
  }

  async updatePicture(pictureId, edit) {
    return await this.GalleryModel.updateOne({ _id: pictureId }, edit).exec();
  }

  async deletePicture(pictureId) {
    return await this.GalleryModel.deleteOne({ _id: pictureId }).exec();
  }

  async approveOrDisapprovePicture(value: boolean, pictureId: string) {
    return await this.GalleryModel.updateOne(
      { _id: pictureId },
      { $set: { approved: value } },
    ).exec();
  }
}
