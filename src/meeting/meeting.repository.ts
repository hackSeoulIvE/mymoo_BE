import { Between, EntityManager, MoreThan, Repository } from 'typeorm';
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
        return await this.repository.findOne({ where : { id }, relations: ['created_by', 'meetingUsers', 'likedUsers'] });
    }


    async findMeeting(type: string, searchtype?: string, keyword?: string, startdate?: Date, eddate?: Date, isnew?: boolean): Promise<Meeting[]> {
        const current_date = new Date();
        let stdate = new Date(startdate);
        let wherecondtion, ordercondtion;
        const queryBuilder = this.repository.createQueryBuilder('meeting')

        queryBuilder.leftJoinAndSelect('meeting.created_by', 'created_by');
        
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
            queryBuilder.andWhere('meeting_date > :stdate', { stdate: stdate });
        }
        
        if(searchtype) {
            if(searchtype === 'meeting_name_description') {
                queryBuilder.andWhere('meeting_name LIKE :keyword OR meeting_description LIKE :keyword', { keyword: `%${keyword}%` });
            }else if(searchtype === 'created_by') {
                queryBuilder.andWhere('created_by.nickname LIKE :keyword', { keyword: `%${keyword}%` });
            }
        }


        if(isnew) {
            queryBuilder.orderBy('created_at', 'ASC');
        }
        else{
            queryBuilder.orderBy('meeting_date', 'DESC');
        }

        return await queryBuilder.getMany();
    }
}
