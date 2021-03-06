import { Injectable } from '@nestjs/common';
import {
  ResidentWithoutArraysDto,
  CreateResidentGalleryDto,
  CreateRelatedCoResidentDto,
  CreatePersonalSponsorDto,
  EditRelatedCoResidentDto,
  EditPersonalSponsorDto,
} from './dto/create-resident.dto';
import { InjectModel } from "nestjs-typegoose";
import { ReturnModelType } from '@typegoose/typegoose';
import { Resident } from './schemas/resident.schema';

@Injectable()
export class ResidentService {
  constructor(
    @InjectModel(Resident)
    private readonly ResidentModel: ReturnModelType<typeof Resident>,
  ) { }
  async createResident(
    resident: ResidentWithoutArraysDto,
    picture?: CreateResidentGalleryDto,
    coResident?: CreateRelatedCoResidentDto,
    personalSponsor?: CreatePersonalSponsorDto,
  ) {
    //
    //
    // Only resident available
    if (resident && !picture && !coResident && !personalSponsor) {
      const createdResident = await new this.ResidentModel(resident);
      return createdResident.save();
    }
    //
    //
    //
    // Only Resident and picture available
    if (resident && picture && !coResident && !personalSponsor) {
      const createdResident = await new this.ResidentModel(resident).save();
      await this.ResidentModel.updateOne(
        { _id: createdResident.id },
        { $addToSet: { gallery: picture } },
      );
      //Returning updated resident
      const updatedResident = await this.ResidentModel.findById(
        createdResident.id,
      ).exec();
      return updatedResident;
    }
    //
    //
    //
    // Only Resident and coResident available
    if (resident && !picture && coResident && !personalSponsor) {
      const createdResident = await new this.ResidentModel(resident).save();
      await this.ResidentModel.updateOne(
        { _id: createdResident.id },
        { $addToSet: { relatedCoResident: coResident } },
      );
      //Returning updated resident
      const updatedResident = await this.ResidentModel.findById(
        createdResident.id,
      ).exec();
      return updatedResident;
    }
    //
    //
    //
    // Only Resident and personalSponsor available
    if (resident && !picture && !coResident && personalSponsor) {
      const createdResident = await new this.ResidentModel(resident).save();
      await this.ResidentModel.updateOne(
        { _id: createdResident.id },
        { $addToSet: { gallery: picture } },
      );
      //Returning updated resident
      const updatedResident = await this.ResidentModel.findById(
        createdResident.id,
      ).exec();
      return updatedResident;
    }
    //
    //
    //
    //Only resident, picture, and coResident available
    if (resident && picture && coResident && !personalSponsor) {
      const createdResident = await new this.ResidentModel(resident).save();
      //Picture
      await this.ResidentModel.updateOne(
        { _id: createdResident.id },
        { $addToSet: { gallery: picture } },
      );
      //relatedCoResident
      await this.ResidentModel.updateOne(
        { _id: createdResident.id },
        { $addToSet: { relatedCoResident: coResident } },
      );
      //Returning updated resident
      const updatedResident = await this.ResidentModel.findById(
        createdResident.id,
      ).exec();
      return updatedResident;
    }
    //
    //
    //
    // Only resident, picture, and personalSponsor available
    if (resident && picture && !coResident && personalSponsor) {
      const createdResident = await new this.ResidentModel(resident).save();
      //Picture
      await this.ResidentModel.updateOne(
        { _id: createdResident.id },
        { $addToSet: { gallery: picture } },
      );
      //personalSponsor
      await this.ResidentModel.updateOne(
        { _id: createdResident.id },
        { $addToSet: { personalSponsor: personalSponsor } },
      );
      //Returning updated resident
      const updatedResident = await this.ResidentModel.findById(
        createdResident.id,
      ).exec();
      return updatedResident;
    }
    //
    //
    //
    //Only resident, coResident, and personalSponsor available
    if (resident && !picture && coResident && personalSponsor) {
      const createdResident = await new this.ResidentModel(resident).save();
      //relatedCoResident
      await this.ResidentModel.updateOne(
        { _id: createdResident.id },
        { $addToSet: { relatedCoResident: coResident } },
      );
      //personalSponsor
      await this.ResidentModel.updateOne(
        { _id: createdResident.id },
        { $addToSet: { personalSponsor: personalSponsor } },
      );
      //Returning updated resident
      const updatedResident = await this.ResidentModel.findById(
        createdResident.id,
      ).exec();
      return updatedResident;
    }
    //
    //
    //
    // All options available
    if (resident && picture && coResident && personalSponsor) {
      const createdResident = await new this.ResidentModel(resident).save();
      //relatedCoResident
      await this.ResidentModel.updateOne(
        { _id: createdResident.id },
        { $addToSet: { relatedCoResident: coResident } },
      );
      //personalSponsor
      await this.ResidentModel.updateOne(
        { _id: createdResident.id },
        { $addToSet: { personalSponsor: personalSponsor } },
      );
      //Returning updated resident
      const updatedResident = await this.ResidentModel.findById(
        createdResident.id,
      ).exec();
      return updatedResident;
    }
  }

  async getAllResidents() {
    return await this.ResidentModel.find().exec();
  }

  async getResidentDetail(residentId) {
    return await this.ResidentModel.findById(residentId).exec();
  }

  async editResident(residentId, edit) {
    return await this.ResidentModel.update({ _id: residentId }, edit).exec();
  }

  async addPicsToGallery(residentId, picture: CreateResidentGalleryDto) {
    await this.ResidentModel.updateOne(
      { _id: residentId },
      { $addToSet: { gallery: picture } },
    );
  }

  async editGalleryPics(
    residentId,
    pictureId: string,
    newPicture: CreateResidentGalleryDto,
  ) {
    const residentPicture = await this.ResidentModel.findById(
      residentId,
      async (err, res) => {
        await res.gallery.filter(value => {
          value._id === pictureId;
        });
      },
    )
      .exec()
      .then(value => {
        return value.gallery[0];
      });

    if (residentPicture) {
      return await this.ResidentModel.updateOne(
        { _id: residentId, 'gallery._id': pictureId },
        { $set: { 'gallery.$': newPicture } },
      );
    } else {
      throw new Error('No such picture in the database');
    }
  }

  async deleteGalleryPics(residentId, pictureId: string) {
    const residentPicture = await this.ResidentModel.findById(
      residentId,
      async (err, res) => {
        await res.gallery.filter(value => {
          value._id === pictureId;
        });
      },
    )
      .exec()
      .then(value => {
        return value.gallery[0];
      });

    if (residentPicture) {
      return await this.ResidentModel.updateOne(
        { _id: residentId },
        { $pull: { gallery: { _id: pictureId } } },
      );
    } else {
      throw new Error('No such picture in the database');
    }
  }

  async addRelatedCoResident(residentId, coResident: CreateRelatedCoResidentDto) {
    await this.ResidentModel.updateOne(
      { _id: residentId },
      { $addToSet: { relatedCoResident: coResident } },
    );
  }

  async getParticularPictureFromGallery(residentId: string, pictureId: string) {
    const residentPicture = await this.ResidentModel.findById(
      residentId,
      async (err, res) => {
        await res.gallery.filter(value => {
          value._id === pictureId;
        });
      },
    )
      .exec()
      .then(value => {
        return value.gallery[0];
      });

    return residentPicture;
  }

  async editRelatedCoResident(
    residentId,
    coResidentId: string,
    newResident: EditRelatedCoResidentDto,
  ) {
    const coResident = await this.ResidentModel.findById(
      residentId,
      async (err, res) => {
        await res.relatedCoResident.filter(value => {
          value._id === coResidentId;
        });
      },
    )
      .exec()
      .then(value => {
        return value.relatedCoResident[0];
      });

    if (coResident) {
      return await this.ResidentModel.updateOne(
        { _id: residentId, 'relatedCoResident._id': coResidentId },
        { $set: { 'relatedCoResident.$': newResident } },
      );
    }
  }

  async deleteRelatedCoResident(residentId, coResidentId: string) {
    const relatedCoResident = await this.ResidentModel.findById(
      residentId,
      async (err, res) => {
        return await res.relatedCoResident.filter(value => {
          value._id === coResidentId;
        });
      },
    )
      .exec()
      .then(value => {
        return value.relatedCoResident[0];
      });
    if (relatedCoResident) {
      return await this.ResidentModel.updateOne(
        { _id: residentId },
        { $pull: { relatedCoResident: { _id: coResidentId } } },
      );
    } else {
      throw new Error('There is no such related Co-Resident for this Resident');
    }
  }

  async addPersonalSponsor(residentId, personalSponsor: CreatePersonalSponsorDto) {
    await this.ResidentModel.updateOne(
      { _id: residentId },
      { $addToSet: { personalSponsor: personalSponsor } },
    );
  }

  async editPersonalSponsor(
    residentId: string,
    sponsorId: string,
    newPersonalSponsor: EditPersonalSponsorDto,
  ) {
    const personalSponsor = await this.ResidentModel.findById(
      residentId,
      async (err, res) => {
        await res.personalSponsor.filter(value => {
          value._id === sponsorId;
        });
      },
    )
      .exec()
      .then(value => {
        return value.personalSponsor[0];
      });

    if (personalSponsor) {
      return await this.ResidentModel.updateOne(
        { _id: residentId, 'personalSponsor._id': sponsorId },
        { $set: { 'personalSponsor.$': newPersonalSponsor } },
      );
    } else {
      throw new Error('There is no such personal sponsor for this Resident');
    }
  }

  async deletePersonalSponsor(residentId, sponsorId: string) {
    const thePersonalSponsor = await this.ResidentModel.findById(
      residentId,
      async (err, res) => {
        await res.personalSponsor.filter(value => {
          value._id === sponsorId;
        });
      },
    )
      .exec()
      .then(value => {
        return value.personalSponsor[0];
      });

    if (thePersonalSponsor) {
      return await this.ResidentModel.updateOne(
        { _id: residentId },
        { $pull: { personalSponsor: { _id: sponsorId } } },
      );
    } else {
      throw new Error('There is no such personal sponsor for this resident');
    }
  }

  async deleteResident(residentId) {
    return await this.ResidentModel.deleteOne({ _id: residentId }).exec();
  }
}
