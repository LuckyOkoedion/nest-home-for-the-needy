import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { Event } from './schemas/event.schema';

@Module({
  imports: [
   TypegooseModule.forFeature([Event]),
    AuthModule,
  ],
  providers: [EventService],
  controllers: [EventController],
})
export class EventModule {}
