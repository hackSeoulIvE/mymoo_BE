import { EntityManager, MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { FoodstoreFood } from './entities/foodstore_food.entity';

@Injectable()
export class FoodStoreFoodRepository extends Repository<FoodstoreFood> {
    constructor(
        @InjectRepository(FoodstoreFood) private readonly repository: Repository<FoodstoreFood>,
    ) {
        super(repository.target, repository.manager);
    }

    async findById(id: number) {
        const result = await this.repository.findOne({where: {id}, relations: ['foodstore']});
        if (result === undefined) {
            throw new NotFoundException('Food not found');
        }
        return result;
    }

}