import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MeetingService } from './meeting.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { AuthGuard } from 'src/auth/security/auth.guard';
import { MeetingIdDto } from './dto/meeting_id.dto';

@ApiTags('Meeting')
@Controller('meeting')
export class MeetingController {
  constructor(private readonly meetingService: MeetingService) {}

  @Post('make_meeting')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('token')
  create(@Req() req: Request, @Body() createMeetingDto: CreateMeetingDto) {
    const { user }:any = req;
    return this.meetingService.create(user.nickname, createMeetingDto);
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.meetingService.findById(+id);
  }

  @Get('type:type')
  findByType(@Param('type') type: string) {
    return this.meetingService.findByType(type);
  }

  @Patch('/join')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('token')
  async joinMeeting(@Req() req: Request, @Body() meetingIdDto: MeetingIdDto) {
    const meeting_id = meetingIdDto.meeting_id;
    const { user }:any = req;
    return await this.meetingService.joinMeeting(user, meeting_id);
  }


  @Delete('/delete')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('token')
  remove(@Req() req: Request, @Body() meetingIdDto: MeetingIdDto) {
    const meeting_id = meetingIdDto.meeting_id;
    const { user }:any = req;
    return this.meetingService.remove(user, meeting_id);
  }
}
