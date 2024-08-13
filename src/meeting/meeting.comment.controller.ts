import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { MeetingCommentService } from "./meeting.comment.service";
import { AuthGuard } from "src/auth/security/auth.guard";
import { createMeetingCommentDto } from "./dto/create-meeting.comment.dto";

@ApiTags('Comment')
@Controller('meeting/comment')
export class MeetingCommentController {
    constructor(private readonly meetingCommentService: MeetingCommentService) {}

    @Post(":meeting_id")
    @ApiOperation({ summary: '댓글 작성 / parent_id에 부모 댓글 id 작성. 없다면 "" 작성 ' })
    @ApiResponse({ status: 401, description: '로그인 없을 시'})
    @ApiResponse({ status: 404, description: '미팅(또는 parent을 작성했다면 parent 미팅)이 존재하지 않을 때' })
    @ApiResponse({ status: 200, description: '그 외 정상적인 응답' })
    @UseGuards(AuthGuard)
    @ApiBearerAuth('token')
    create(@Req() req: Request, @Param("meeting_id") meeting_id: number, @Body() createMeetingCommentDto: createMeetingCommentDto) {
        const { user }:any = req;
        return this.meetingCommentService.createComment(createMeetingCommentDto, meeting_id, user);
    }

    @Get(":meeting_id")
    @ApiOperation({ summary: '모임의 댓글 조회' })
    getComments(@Param("meeting_id") meeting_id: number){
        return this.meetingCommentService.getComments(meeting_id);
    }
}