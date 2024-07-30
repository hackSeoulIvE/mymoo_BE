import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { MeetingService } from './meeting.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { AuthGuard } from 'src/auth/security/auth.guard';
import { MeetingIdDto } from './dto/meeting_id.dto';

@ApiTags('Meeting')
@Controller('meeting')
export class MeetingController {
  constructor(private readonly meetingService: MeetingService) {}

  @Post('make_meeting')
  @ApiOperation({ summary: '모임 만들기' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('token')
  create(@Req() req: Request, @Body() createMeetingDto: CreateMeetingDto) {
    const { user }:any = req;
    return this.meetingService.create(user, createMeetingDto);
  }

  @Get('id/:id')
  @ApiOperation({ summary: '아이디로 모임 조회' })
  findOne(@Param('id') id: string) {
    return this.meetingService.findById(+id);
  }

  @Get('type:type')
  @ApiOperation({ summary: "모임 조회 ['all', 'play', 'eat', 'extra', 'study'] / isnew가 true면 새로 작성된 순으로 정렬 (default오 false는 모임날짜 기준)" })
  @ApiQuery({ name: 'stdate', required: false })
  @ApiQuery({ name: 'eddate', required: false })
  @ApiQuery({ name: 'new', required: false })
  findMeeting(@Param('type') type: string, @Query('stdate') stdate?: Date, @Query('eddate') eddate?: Date, @Query('new') isnew?: boolean) {
    return this.meetingService.findMeeting(type, stdate, eddate, isnew);
  }

  @Patch('/join')
  @ApiOperation({ summary: '모임 참가' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('token')
  async joinMeeting(@Req() req: Request, @Body() meetingIdDto: MeetingIdDto) {
    const meeting_id = meetingIdDto.meeting_id;
    const { user }:any = req;
    return await this.meetingService.joinMeeting(user, meeting_id);
  }

  @Patch('/like')
  @ApiOperation({ summary: '모임 찜하기' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('token')
  async likeMeeting(@Req() req: Request, @Body() meetingIdDto: MeetingIdDto) {
    const meeting_id = meetingIdDto.meeting_id;
    const { user }:any = req;
    return await this.meetingService.likeMeeting(user, meeting_id);
  }

  @Patch('/leave')
  @ApiOperation({ summary: '모임 나가기' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('token')
  async leaveMeeting(@Req() req: Request, @Body() meetingIdDto: MeetingIdDto) {
    const meeting_id = meetingIdDto.meeting_id;
    const { user }:any = req;
    return await this.meetingService.leaveMeeting(user, meeting_id);
  }
  
  /*
  @Patch('/unlike')
  @ApiOperation({ summary: '모임 찜 취소' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('token')
  async unlikeMeeting(@Req() req: Request, @Body() meetingIdDto: MeetingIdDto) {
    const meeting_id = meetingIdDto.meeting_id;
    const { user }:any = req;
    return await this.meetingService.unlikeMeeting(user, meeting_id);
  }
  */


  @Delete('/delete')
  @ApiOperation({ summary: '모임 삭제(만든 사람만 가능)' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('token')
  remove(@Req() req: Request, @Body() meetingIdDto: MeetingIdDto) {
    const meeting_id = meetingIdDto.meeting_id;
    const { user }:any = req;
    return this.meetingService.remove(user, meeting_id);
  }
}
