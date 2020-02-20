import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Res,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { Response } from 'express';

@Controller('/api/admin/event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async createEvent(@Body() event: CreateEventDto, @Res() res: Response) {
    try {
      await this.eventService.createEvent(event).then(() => {
        res.status(201).json({
          message: 'New event created successfully',
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
  @Get()
  async getAllEvents(@Res() res: Response) {
    try {
      const result = await this.eventService.getAllEvents();
      if (result) {
        res.status(200).json(result);
      }
    } catch (error) {
      console.log(error);
    }
  }
  @Get('/:eventId')
  async getEventDetail(@Param('eventId') eventId, @Res() res: Response) {
    try {
      const result = await this.eventService.getEventDetail(eventId);
      if (result) {
        res.status(200).json(result);
      }
    } catch (error) {
      console.log(error);
    }
  }
  @Put('/:eventId')
  async updateEvent(
    @Param('eventId') eventId,
    @Body() edit,
    @Res() res: Response,
  ) {
    try {
      await this.eventService.updateEvent(eventId, edit).then(() => {
        res.status(201).json({
          message: 'An event edited successfully',
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
  @Delete('/:eventId')
  async deleteEvent(@Param('eventId') eventId, @Res() res: Response) {
    try {
      await this.eventService.deleteEvent(eventId).then(() => {
        res.status(201).json({
          message: 'An event deleted successfully',
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
}
