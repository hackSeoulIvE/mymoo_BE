import { EntityManager, MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository extends Repository<User> {
    constructor(
        @InjectRepository(User) private readonly repository: Repository<User>,
    ) {
        super(repository.target, repository.manager);
    }

    async findById(id: number): Promise<User> {
        return await this.repository.findOne({ where : { id }});
    }

    async findByUserId(user_id: string): Promise<User> {
        return await this.repository.findOne({ where : { user_id }});
    }

    async findByNickname(nickname: string): Promise<User> {
        return await this.repository.findOne({ where : { nickname }});
    }

    async joinMeeting(user: User, meeting_id: number,  manager: EntityManager ): Promise<void> {
        let data = JSON.parse(user.posted_meeting);
        if(!data.includes(meeting_id)) {
            data.push(meeting_id);
        }
        user.posted_meeting = JSON.stringify(data);;

        await manager.save(user);
    }
}
