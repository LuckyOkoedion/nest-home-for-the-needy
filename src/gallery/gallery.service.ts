import { Injectable} from '@nestjs/common';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { Model } from 'mongoose';
import { IGallery } from './interfaces/gallery.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class GalleryService {
  constructor(
    @InjectModel('Gallery') private readonly GalleryModel: Model<IGallery>,
  ) {}
  async uploadPicture(picture: CreateGalleryDto) {
    const createdPicture = await new this.GalleryModel(picture);
    return createdPicture.save();
  }

  async getAllPictures() {
    return await this.GalleryModel.find().exec();
  }

  async getPictureDetail(pictureId) {
    return await this.GalleryModel.findById(pictureId).exec();
  }

  async updatePicture(pictureId, edit) {
    return await this.GalleryModel.updateOne({ _id: pictureId }, edit).exec();
  }

  async deletePicture(pictureId) {
    return await this.GalleryModel.remove({ _id: pictureId }).exec();
  }

  async approveOrDisapprovePicture(value: boolean, pictureId: string) {
    return await this.GalleryModel.updateOne(
      { _id: pictureId },
      { $set: { approved: value } },
    ).exec();
  }
}
