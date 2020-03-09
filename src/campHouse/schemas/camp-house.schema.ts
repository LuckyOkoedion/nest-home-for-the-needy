import { prop, mongoose, arrayProp, Ref } from '@typegoose/typegoose';
import { Resident } from 'src/resident/schemas/resident.schema';

export class ResidentItem {
  @prop({ ref: 'Resident' })
  residentId: Ref<Resident>;
}

export class CampHouse {
  @prop({ default: new mongoose.Types.ObjectId() })
  _id: mongoose.Schema.Types.ObjectId;
  @arrayProp({ items: ResidentItem })
  residents: ResidentItem[];
  @prop({ ref: 'Resident' })
  leader: Ref<Resident>;
}
