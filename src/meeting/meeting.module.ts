import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meeting } from './entities/meeting.entity';
import { MeetingController } from './meeting.controller';
import { MeetingService } from './meeting.service';
import { MeetingRepository } from './meeting.repository';
import { UsersModule } from 'src/users/users.module';
import { MeetingCommentController } from './meeting.comment.controller';
import { MeetingCommentRepository } from './meeting.comment.repository';
import { MeetingCommentService } from './meeting.comment.service';
import { MeetingComment } from './entities/meeting.comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Meeting]), TypeOrmModule.forFeature([MeetingComment]), UsersModule],
  controllers: [MeetingController, MeetingCommentController],
  providers: [MeetingService, MeetingRepository, MeetingCommentService, MeetingCommentRepository],
  exports: [MeetingRepository],
})
export class MeetingModule {}
