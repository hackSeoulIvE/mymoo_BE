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
        return await this.repository.findOne({ where : { id }});
    }

    async findByUserId(meeting_name: string): Promise<Meeting> {
        return await this.repository.findOne({ where : { meeting_name }});
    }

    async findByType(type: string): Promise<Meeting[]> {
        if(type === 'all') {
            return await this.repository.find();
        }
        return await this.repository.find({ where : { type }});
    }

    async joinMeeting(nickname: string, meeting_id: number,  manager: EntityManager ): Promise<void> {
        const meeting = await this.repository.findOne({ where : { id : meeting_id}});
        if(!meeting) {
            throw new NotFoundException();
        }
        const meetingUsers = meeting.meetingUsers;
        
        let data = JSON.parse(meetingUsers);

        if(!data.includes(nickname)) {
            data.push(nickname);
        }
        meeting.meetingUsers = JSON.stringify(data);

        await manager.save(meeting);
    }
}
