import { MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Meeting } from './entities/meeting.entity';

@Injectable()
export class MeetingRepository extends Repository<Meeting> {
    constructor(
        @InjectRepository(Meeting) private readonly repository: Repository<Meeting>,
    ) {
        super(repository.target, repository.manager);
    }

    async findById(id: number): Promise<Meeting> {
        return await this.repository.findOne({ where : { id }});
    }

    async findByUserId(meeting_name: string): Promise<Meeting> {
        return await this.repository.findOne({ where : { meeting_name }});
    }
}
