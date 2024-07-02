import { MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Group } from './entities/group.entity';

@Injectable()
export class GroupRepository extends Repository<Group> {
    constructor(
        @InjectRepository(Group) private readonly repository: Repository<Group>,
    ) {
        super(repository.target, repository.manager);
    }

    async findById(id: number): Promise<Group> {
        return await this.repository.findOne({ where : { id }});
    }

    async findByUserId(group_name: string): Promise<Group> {
        return await this.repository.findOne({ where : { group_name }});
    }
}
