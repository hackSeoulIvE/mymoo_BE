import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { FoodstoreComment } from './entities/foodstore_comment.entity';

@Injectable()
export class FoodStoreCommentRepository extends Repository<FoodstoreComment> {
    constructor(
        @InjectRepository(FoodstoreComment) private readonly repository: Repository<FoodstoreComment>,
    ) {
        super(repository.target, repository.manager);
    }

    async findById(id: number) {
        return this.repository.findOne({where: {id: id}});
    }

}