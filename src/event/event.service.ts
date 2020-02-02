import { Injectable, Inject } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { Model } from 'mongoose';
import { IEvent } from './interfaces/event.interface';

@Injectable()
export class EventService {
  constructor(
    @Inject('EVENT_MODEL') private readonly EventModel: Model<IEvent>,
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
