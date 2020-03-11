import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { InjectModel } from "nestjs-typegoose";
import { ReturnModelType } from '@typegoose/typegoose';
import { Event } from './schemas/event.schema';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event)
    private readonly EventModel: ReturnModelType<typeof Event>,
  ) {}
  async createEvent(event: CreateEventDto) {
    const createdEvent = await new this.EventModel(event);
    return createdEvent.save();
  }

  async getAllEvents() {
    return await this.EventModel.find().exec();
  }

  async getEventDetail(eventId) {
    return await this.EventModel.findById(eventId).exec();
  }

  async updateEvent(eventId, edit) {
    return await this.EventModel.updateOne({ _id: eventId }, edit);
  }

  async deleteEvent(eventId) {
    return await this.EventModel.remove({ _id: eventId }).exec();
  }
}
