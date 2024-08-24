import { EntityManager, MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Foodstore } from './entities/foodstore.entity';
import { SearchFoodstoreDto } from './dto/search-foodstore.dto';

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

    async search(searchfooddto: SearchFoodstoreDto, keyword?: string) {
        const currentLatitude = searchfooddto.latitude
        const currentLongitude = searchfooddto.longitude

        const queryBuilder = this.repository.createQueryBuilder('foodstore')
        queryBuilder.addSelect(`(
            6371 * acos(
              cos(radians(:currentLatitude)) * 
              cos(radians(foodstore.latitude)) * 
              cos(radians(foodstore.longitude) - radians(:currentLongitude)) + 
              sin(radians(:currentLatitude)) * 
              sin(radians(foodstore.latitude))
            )
          )`, 'distance')
          .setParameters({
            currentLatitude,
            currentLongitude,
          })
        if(keyword) {
            queryBuilder.where('foodstore.name like :keyword', {keyword: `%${keyword}%`})
        }
        queryBuilder.orderBy('distance', 'ASC')
        queryBuilder.orderBy('foodstore.is_open', 'DESC')
        return await queryBuilder.getMany()
    }

}