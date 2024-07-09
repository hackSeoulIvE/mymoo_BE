import { EntityManager, MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Meeting } from './entities/meeting.entity';

@Injectable()
export class MeetingRepository extends Repository<Meeting> {
    constructor(
        @InjectRepository(Meeting) private readonly repository: Repository<Meeting>,
    ) {
        super(repository.target, repository.manager);
    }

    async findById(id: number): Promise<Meeting> {
        return await this.repository.findOne({ where : { id }, relations: ['created_by', 'meetingUsers'] });
    }


    async findByType(type: string): Promise<Meeting[]> {
        if(type === 'all') {
            return await this.repository.find({relations: ['created_by']});
        }
        return await this.repository.find({ where : { type }, relations: ['created_by'] });
    }

}
