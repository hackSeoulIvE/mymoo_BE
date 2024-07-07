import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { MeetingCommentService } from "./meeting.comment.service";
import { AuthGuard } from "src/auth/security/auth.guard";
import { createMeetingCommentDto } from "./dto/create-meeting.comment.dto";

@ApiTags('Meeting/Comment')
@Controller('meeting/comment')
export class MeetingCommentController {
    constructor(private readonly meetingCommentService: MeetingCommentService) {}

    @Post(":meeting_id")
    @UseGuards(AuthGuard)
    @ApiBearerAuth('token')
    create(@Req() req: Request, @Param("meeting_id") meeting_id: number, @Body() createMeetingCommentDto: createMeetingCommentDto) {
        const { user }:any = req;
        return this.meetingCommentService.createComment(createMeetingCommentDto, meeting_id, user);
    }

    @Get(":meeting_id")
    getComments(@Param("meeting_id") meeting_id: number){
        return this.meetingCommentService.getComments(meeting_id);
    }
}