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
        
        const result = await queryBuilder.getOne()
        return {
            ...result,
            is_open: this.IsOpen(result.start_Time, result.end_Time),
        }
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
        const result = await queryBuilder.getMany()
        const addopen = result.map((foodstore) => ({
            ...foodstore,
            is_open: this.IsOpen(foodstore.start_Time, foodstore.end_Time),
        }))
        return addopen.sort((a, b) => a.is_open === b.is_open ? 0 : a.is_open ? -1 : 1)
    }
    private IsOpen(openTime, closeTime) {
        const now = new Date();
        const currentTime = now.toTimeString().substr(0, 8); 
        if (openTime <= currentTime && closeTime >= currentTime) {
            return true
        }
        return false
    }
}