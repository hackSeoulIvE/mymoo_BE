import { IsNull, Repository } from "typeorm";
import { MeetingComment } from "./entities/meeting.comment.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class MeetingCommentRepository extends Repository<MeetingComment> {
    constructor(
        @InjectRepository(MeetingComment) private readonly repository: Repository<MeetingComment>,
    ) {
        super(repository.target, repository.manager);
    }

    async findById(id: number): Promise<MeetingComment> {
        return await this.repository.findOne({ where : {id: id, parent: IsNull()}});
    }

}
