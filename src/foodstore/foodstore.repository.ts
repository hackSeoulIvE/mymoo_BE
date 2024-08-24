import { EntityManager, MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Foodstore } from './entities/foodstore.entity';

@Injectable()
export class FoodStoreRepository extends Repository<Foodstore> {
    constructor(
        @InjectRepository(Foodstore) private readonly repository: Repository<Foodstore>,
    ) {
        super(repository.target, repository.manager);
    }

    async findById(id: number) {
        const queryBuilder = this.repository.createQueryBuilder('foodstore')
        queryBuilder.leftJoinAndSelect('foodstore.foods', 'foods')
        queryBuilder.leftJoinAndSelect('foodstore.comments', 'comments')
        queryBuilder.leftJoinAndSelect('comments.user', 'comments_user')
        queryBuilder.where('foodstore.id = :id', {id: id })
        return await queryBuilder.getOne()
    }

    async search(keyword?: string) {
        const queryBuilder = this.repository.createQueryBuilder('foodstore')
        if(keyword) {
            console.log(1);
            queryBuilder.where('foodstore.name like :keyword', {keyword: `%${keyword}%`})
        }
        queryBuilder.orderBy('foodstore.is_open', 'DESC')
        return await queryBuilder.getMany()
    }

}