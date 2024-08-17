import { Injectable, NotFoundException } from "@nestjs/common";
import { createMeetingCommentDto } from "./dto/create-meeting.comment.dto";
import { User } from "src/users/entities/user.entity";
import { MeetingComment } from "./entities/meeting.comment.entity";
import { MeetingCommentRepository } from "./meeting.comment.repository";
import { MeetingRepository } from "./meeting.repository";
import { IsNull } from "typeorm";

@Injectable()
export class MeetingCommentService {
    constructor(
        private readonly meetingCommentRepository: MeetingCommentRepository,
        private readonly meetingRepository: MeetingRepository,
    ) {}

    async createComment(createCommentDto: createMeetingCommentDto, meeting_id: number, user:User) {
        const comment = new MeetingComment();

        const meeting = await this.meetingRepository.findById(meeting_id);
        if(!meeting) {
            throw new NotFoundException();
        }
        comment.user = user;
        comment.meeting = meeting;
        comment.content = createCommentDto.content;
        if(createCommentDto.parent_id) {
            const parent = await this.meetingCommentRepository.findById(createCommentDto.parent_id);
            if(!parent) {
                throw new NotFoundException();
            }
            
            comment.parent = parent;
        } 
        await this.meetingCommentRepository.save(comment);
        return this.getComments(meeting_id);
    }

    async getComments(meeting_id: number) {
        return await this.meetingCommentRepository.find({ 
            where : { meeting : {id: meeting_id}, parent: IsNull() },
            relations: {
                parent: true,
                children: true,
            },
            order: {
                createdAt: "ASC"
            }
        });
    }
}
