import { EntityManager, MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(
        @InjectRepository(User) private readonly repository: Repository<User>,
    ) {
        super(repository.target, repository.manager);
    }

    async findById(id: number) {
        if(isNaN(id)) {
            throw new NotFoundException('id must be a number');
        }
        return this.repository.findOne({where: {id: id}});
    }

    async findByRefreshToken(refreshToken: string): Promise<User> {
        const now = new Date();
        return await this.repository.findOne({ where : { refreshtoken : refreshToken}});
    }

    async findByUserId(username: string) {
        return this.repository.findOne({where: {username}});
    }

    async findByNickname(nickname: string) {
        return this.repository.findOne({where: {nickname}});
    }
}