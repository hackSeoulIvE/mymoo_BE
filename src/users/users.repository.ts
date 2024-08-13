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

    async findByEmail(email: string): Promise<User> {
        return await this.repository.findOne({ where : { email }});
    }

    async findByRefreshToken(refreshToken: string): Promise<User> {
        const now = new Date();
        return await this.repository.findOne({ where : { refreshtoken : refreshToken}});
    }

    async findComingMeetings(user: User, type:string) {
        const currentDate = new Date();
        const queryBuilder = this.repository.createQueryBuilder('user')
        
        queryBuilder.where('user.id = :id', { id: user.id });
        if(type === 'all') {
            queryBuilder.leftJoinAndSelect('user.my_meetings', 'meeting', 'meeting.meeting_date > :currentDate', { currentDate });
        }else if(type === 'mine') {
            queryBuilder.leftJoinAndSelect('user.made_meetings', 'meeting', 'meeting.meeting_date > :currentDate', { currentDate });
        }else if(type === 'joined') {
            queryBuilder.leftJoinAndSelect('user.my_meetings', 'meeting', 'meeting.meeting_date > :currentDate', { currentDate });
        }
        
        queryBuilder.orderBy('meeting.meeting_date', 'ASC');

        return queryBuilder.getOne();
    }

    async findPastMeetings(user: User, type:string) {
        const currentDate = new Date();

        return this.repository.createQueryBuilder('user')
          .leftJoinAndSelect('user.posted_meetings', 'meeting', 'meeting.meeting_date > :currentDate', { currentDate })
          .where('user.id = :id', { id: user.id })
          .orderBy('meeting.meeting_date', 'ASC')
          .getMany();
    }

    async findLikedMeetings(user: User, type:string) {
        const currentDate = new Date();

        return this.repository.createQueryBuilder('user')
          .leftJoinAndSelect('user.liked_meetings', 'meeting', 'meeting.meeting_date > :currentDate', { currentDate })
          .where('user.id = :id', { id: user.id })
          .orderBy('meeting.meeting_date', 'ASC')
          .getMany();
    }

    async findAllMyComments(user: User) {
        return this.repository.createQueryBuilder('user')
          .leftJoinAndSelect('user.meetingcomments', 'comment')
          .where('user.id = :id', { id: user.id })
          .orderBy('comment.createdAt', 'DESC')
          .getOne();
    }

}
