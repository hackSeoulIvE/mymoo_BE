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
        return await this.repository.findOne({ where : { id } });
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

    async findByIdwithMeeting(id: number, now: Date, chknew: boolean): Promise<User> {
        if(chknew){
            return await this.repository.createQueryBuilder('user')
                .leftJoinAndSelect('user.made_meetings', 'made_meetings', 'made_meetings.meeting_date > :now', { now })
                .where('user.id = :id', { id })
                .getOne();
        }else{
            return await this.repository.createQueryBuilder('user')
                .leftJoinAndSelect('user.made_meetings', 'made_meetings', 'made_meetings.meeting_date < :now', { now })
                .where('user.id = :id', { id })
                .getOne();
        }
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
            const newuser = await this.findByIdwithMeeting(user.id, currentDate, true); 
            const made_meetings_id = newuser.made_meetings.map(meeting => meeting.id);

            queryBuilder.leftJoinAndSelect('user.my_meetings', 'meeting', 'meeting.meeting_date > :currentDate', { currentDate });
            if(made_meetings_id.length > 0) {
                queryBuilder.andWhere('meeting.id NOT IN (:...made_meetings_id)', { made_meetings_id });
            }
        }
        
        queryBuilder.orderBy('meeting.meeting_date', 'ASC');
        let result;
        if(type === 'all' || type === 'joined') {
            result = await queryBuilder.getMany().then((result) => result.flatMap((user) => user.my_meetings));
        }else if(type === 'mine') {
            result = await queryBuilder.getMany().then((result) => result.flatMap((user) => user.made_meetings));
        }
        return result;
    }

    async findPastMeetings(user: User, type:string) {
        const currentDate = new Date();
        const queryBuilder = this.repository.createQueryBuilder('user')
        
        queryBuilder.where('user.id = :id', { id: user.id });
        if(type === 'all') {
            queryBuilder.leftJoinAndSelect('user.my_meetings', 'meeting', 'meeting.meeting_date < :currentDate', { currentDate });
        }else if(type === 'mine') {
            queryBuilder.leftJoinAndSelect('user.made_meetings', 'meeting', 'meeting.meeting_date < :currentDate', { currentDate });
        }else if(type === 'joined') {
            const newuser = await this.findByIdwithMeeting(user.id, currentDate, false); 
            const made_meetings_id = newuser.made_meetings.map(meeting => meeting.id);

            queryBuilder.leftJoinAndSelect('user.my_meetings', 'meeting', 'meeting.meeting_date < :currentDate', { currentDate });
            if(made_meetings_id.length > 0) {
                queryBuilder.andWhere('meeting.id NOT IN (:...made_meetings_id)', { made_meetings_id });
            }
        }
        
        queryBuilder.orderBy('meeting.meeting_date', 'ASC');
        let result;
        if(type === 'all' || type === 'joined') {
            result = await queryBuilder.getMany().then((result) => result.flatMap((user) => user.my_meetings));
        }else if(type === 'mine') {
            result = await queryBuilder.getMany().then((result) => result.flatMap((user) => user.made_meetings));
        }
        return result;
    }

    async findLikedMeetings(user: User, type:string) {
        const currentDate = new Date();
        const queryBuilder = this.repository.createQueryBuilder('user')
        
        queryBuilder.where('user.id = :id', { id: user.id });
        queryBuilder.leftJoinAndSelect('user.liked_meetings', 'meeting', 'meeting.meeting_date > :currentDate', { currentDate });
        queryBuilder.orderBy('meeting.meeting_date', 'ASC');
        const result = await queryBuilder.getMany().then((result) => result.flatMap((user) => user.liked_meetings));

        return result;
    }

    async findAllMyComments(user: User) {
        return this.repository.createQueryBuilder('user')
          .leftJoinAndSelect('user.meetingcomments', 'comment')
          .where('user.id = :id', { id: user.id })
          .orderBy('comment.createdAt', 'DESC')
          .getOne();
    }

}
