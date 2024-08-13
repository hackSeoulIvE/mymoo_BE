import { Between, Brackets, EntityManager, MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Meeting } from './entities/meeting.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class MeetingRepository extends Repository<Meeting> {
    constructor(
        @InjectRepository(Meeting) private readonly repository: Repository<Meeting>,
    ) {
        super(repository.target, repository.manager);
    }

    async findById(id: number): Promise<Meeting> {
        return await this.repository.findOne({ where : { id }, relations: ['created_by', 'meetingUsers', 'likedUsers'] });
    }


    async findMeeting(type: string, searchtype?: string, keyword?: string, startdate?: Date, eddate?: Date, isnew?: boolean, user?: User): Promise<Meeting[]> {
        const current_date = new Date();
        let stdate = new Date(startdate);
        let wherecondtion, ordercondtion;
        const queryBuilder = this.repository.createQueryBuilder('meeting')

        queryBuilder.leftJoinAndSelect('meeting.created_by', 'created_by');
        queryBuilder.leftJoinAndSelect('meeting.meetingUsers', 'meetingUsers');
        queryBuilder.leftJoinAndSelect('meeting.likedUsers', 'likedUsers'); 
        
        if(!startdate || stdate.getTime() < current_date.getTime()) {
            stdate = current_date;
        }

        if(type !== 'all') {
            queryBuilder.where('type = :type', { type: type });
        }
        if(eddate){
            queryBuilder.andWhere('meeting_date BETWEEN :stdate AND :eddate', { stdate: stdate, eddate: eddate });
        }
        else{
            queryBuilder.andWhere('meeting_date >    :stdate', { stdate: stdate });
        }
        
        if(searchtype) {
            if(searchtype === 'meeting_name_description') {
                queryBuilder.andWhere(new Brackets
                    (qb => {qb.where('meeting_name LIKE :keyword OR meeting_description LIKE :keyword', { keyword: `%${keyword}%` })}));
            }else if(searchtype === 'created_by') {
                queryBuilder.andWhere('created_by.nickname LIKE :keyword', { keyword: `%${keyword}%` });
            }
        }

        queryBuilder.select([
            'meeting.id AS id',
            'meeting.meeting_name AS meeting_name',
            'meeting.meeting_description AS meeting_description',
            'meeting.type AS type',
            'meeting.user_count AS user_count',
            'meeting.deadline AS deadline',
            'meeting.meeting_date AS meeting_date',
            'meeting.min_user AS min_user',
            'meeting.max_user AS max_user',
            'meeting.createdAt AS createdAt',
            'created_by.nickname AS created_by',
          ])
        
        if(user){
            queryBuilder.addSelect(`CASE WHEN meetingUsers.id = ${user.id} OR created_by.id = ${user.id} THEN TRUE ELSE FALSE END`, 'is_joined');
            queryBuilder.addSelect(`CASE WHEN likedUsers.id = ${user.id} THEN TRUE ELSE FALSE END`, 'is_liked');
        }
        else{
            queryBuilder.addSelect('FALSE', 'is_joined');
            queryBuilder.addSelect('FALSE', 'is_liked');
        }
        

        if(isnew) {
            queryBuilder.orderBy('createdAt', 'ASC');
        }
        else{
            queryBuilder.orderBy('meeting_date', 'DESC');
        }

        return await queryBuilder.getRawMany();
    }
}
