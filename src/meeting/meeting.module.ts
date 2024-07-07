import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meeting } from './entities/meeting.entity';
import { MeetingController } from './meeting.controller';
import { MeetingService } from './meeting.service';
import { MeetingRepository } from './meeting.repository';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Meeting]), UsersModule],
  controllers: [MeetingController],
  providers: [MeetingService, MeetingRepository],
  exports: [MeetingRepository],
})
export class MeetingModule {}
