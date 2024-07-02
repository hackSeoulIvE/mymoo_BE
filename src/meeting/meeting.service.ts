import { Injectable } from '@nestjs/common';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { MeetingRepository } from './meeting.repository';
import { Meeting } from './entities/meeting.entity';
import { UpdateMeetingDto } from './dto/update-meeting.dto';

@Injectable()
export class MeetingService {
  constructor(private readonly meetingRepository:MeetingRepository) {}

  async create(createMeetingDto: CreateMeetingDto) {
    const meeting = new Meeting();

    meeting.meeting_name = createMeetingDto.meeting_name;
    meeting.is_flash = createMeetingDto.is_flash;
    meeting.created_by = createMeetingDto.created_by;
    meeting.meetingUsers = createMeetingDto.meetingUsers;

    return await this.meetingRepository.save(meeting);
  }

  findAll() {
    return this.meetingRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} group`;
  }

  update(id: number, updateMeetingDto: UpdateMeetingDto) {
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
