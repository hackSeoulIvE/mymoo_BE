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


    async findMeeting(type: string, startdate?: Date, eddate?: Date, isnew?: boolean): Promise<Meeting[]> {
        const current_date = new Date();
        let stdate = new Date(startdate);
        let wherecondtion, ordercondtion;
        
        if(!startdate || stdate.getTime() < current_date.getTime()) {
            stdate = current_date;
        }


        if(type === 'all') {
            if(eddate){
                wherecondtion = {meeting_date: Between(stdate, eddate)};
            }
            else{
                wherecondtion = {meeting_date: MoreThan(stdate)};
            }
        }
        else{
            if(eddate){
                wherecondtion = {
                    type: type, 
                    meeting_date: Between(stdate, eddate),
                };
            }
            else{
                wherecondtion = {
                    type: type,
                    meeting_date: MoreThan(stdate),
                };
            }
        }

        if(isnew) {
            ordercondtion = {createdAt: "ASC"};
        }
        else{
            ordercondtion = {meeting_date: "DESC"};
        }

        return await this.repository.find({ 
            where : wherecondtion, 
            relations: ['created_by'],
            order: ordercondtion, 
        });
    }

}
