import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('/api/admin/event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async createEvent(@Body() event: CreateEventDto) {
    try {
      await this.eventService.createEvent(event);
    } catch (error) {
      console.log(error);
    }
  }
  @Get()
  async getAllEvents() {
    try {
      await this.eventService.getAllEvents();
    } catch (error) {
      console.log(error);
    }
  }
  @Get('/:eventId')
  async getEventDetail(@Param('eventId') eventId) {
    try {
      await this.eventService.getEventDetail(eventId);
    } catch (error) {
      console.log(error);
    }
  }
  @Put('/:eventId')
  async updateEvent(@Param('eventId') eventId, @Body() edit) {
    try {
        await this.eventService.updateEvent(eventId, edit);
    } catch (error) {
        console.log(error);
    }
  }
  @Delete('/:eventId')
  async deleteEvent(@Param('eventId') eventId) {
    try {
        await this.eventService.deleteEvent(eventId);
    } catch (error) {
        console.log(error);
    }
  }
}
