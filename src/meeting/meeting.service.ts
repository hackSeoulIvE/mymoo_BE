import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { MeetingRepository } from './meeting.repository';
import { Meeting } from './entities/meeting.entity';
import { User } from 'src/users/entities/user.entity';
import { DataSource } from 'typeorm';
import { UsersRepository } from 'src/users/users.repository';
import { differenceInDays } from 'date-fns';

@Injectable()
export class MeetingService {
  constructor(
    private readonly meetingRepository:MeetingRepository,
    private readonly usersRepository: UsersRepository,
    private readonly dataSource: DataSource
  ) {}

  async create(user_nickname: string, createMeetingDto: CreateMeetingDto) {
    const meeting = new Meeting();
    
    // 한국 시간으로 설정
    const now = new Date(Date.now() + 9 * 60 * 60 * 1000);
    const kr_meeting_Date = new Date(createMeetingDto.meeting_date+'Z');
    const kr_deadline = new Date(createMeetingDto.deadline+'Z');

    if(kr_meeting_Date < now || kr_deadline < now) {
      throw new ForbiddenException();
    }

    meeting.meeting_name = createMeetingDto.meeting_name;
    meeting.meeting_description = createMeetingDto.meeting_description;
    meeting.type = createMeetingDto.type;
    
    if(now.getFullYear() === kr_meeting_Date.getFullYear() && now.getMonth() === kr_meeting_Date.getMonth() && kr_meeting_Date.getDate() - now.getDate()  <= 1) {
      meeting.is_flash = true;
    }
    else {
      meeting.is_flash = false;
    }
    meeting.created_by = user_nickname;
    meeting.meetingUsers = JSON.stringify([user_nickname]);
    meeting.deadline = createMeetingDto.deadline;
    meeting.meeting_date = createMeetingDto.meeting_date;
    meeting.min_user = createMeetingDto.min_user;
    meeting.max_user = createMeetingDto.max_user;

    return await this.meetingRepository.save(meeting);
  }

  findById(id: number) {
    return this.meetingRepository.findById(id);
  }

  findByType(type: string) {
    const possible_type = ['all', 'play', 'eat', 'extra', 'study'];
    if(!possible_type.includes(type)) {
      throw new NotFoundException();
    }
    return this.meetingRepository.findByType(type);
  }

  async joinMeeting(user: User, meeting_id: number) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try{
      await this.usersRepository.joinMeeting(user, meeting_id, queryRunner.manager);
      await this.meetingRepository.joinMeeting(user.nickname, meeting_id, queryRunner.manager);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async remove(user: User, id: number) {
    const meeting = await this.meetingRepository.findById(id);
    if(!meeting) {
      throw new NotFoundException();
    }
    if(meeting.created_by !== user.nickname) {
      throw new ForbiddenException();
    }
    const temp = JSON.parse(meeting.meetingUsers);
    if(temp.length >= meeting.min_user) {
      throw new ForbiddenException();
    }
    return this.meetingRepository.delete(id);
  }
}
