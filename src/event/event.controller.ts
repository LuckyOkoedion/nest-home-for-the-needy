import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Res,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/permissions.guard';
import { Permissions } from 'src/auth/permissions.decorator';
import { permissionsEnum } from 'src/utils/permissions.enum';

@Controller('/api/admin/event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Post()
  @Permissions(permissionsEnum.CREATE_EVENTS)
  async createEvent(@Body() event: CreateEventDto, @Res() res: Response) {
    try {
      await this.eventService.createEvent(event).then(() => {
        res.status(201).json({
          message: 'New event created successfully',
        });
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_IMPLEMENTED);
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Get()
  @Permissions(permissionsEnum.READ_EVENTS)
  async getAllEvents(@Res() res: Response) {
    try {
      const result = await this.eventService.getAllEvents();
      if (result) {
        res.status(200).json(result);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Get('/:eventId')
  @Permissions(permissionsEnum.READ_EVENTS)
  async getEventDetail(@Param() params, @Res() res: Response) {
    try {
      const eventId = params.eventId;
      const result = await this.eventService.getEventDetail(eventId);
      if (result) {
        res.status(200).json(result);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Put('/:eventId')
  @Permissions(permissionsEnum.UPDATE_EVENTS)
  async updateEvent(
    @Param() params,
    @Body() edit,
    @Res() res: Response,
  ) {
    try {
      const eventId = params.eventId;
      await this.eventService.updateEvent(eventId, edit).then(() => {
        res.status(201).json({
          message: 'An event edited successfully',
        });
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_MODIFIED);
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Delete('/:eventId')
  @Permissions(permissionsEnum.DELETE_EVENTS)
  async deleteEvent(@Param() params, @Res() res: Response) {
    try {
      const eventId = params.eventId;
      await this.eventService.deleteEvent(eventId).then(() => {
        res.status(201).json({
          message: 'An event deleted successfully',
        });
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_IMPLEMENTED);
    }
  }
}
