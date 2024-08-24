import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFoodStoreDto } from './dto/create-foodstore.dto';
import { FoodStoreRepository } from './foodstore.repository';
import { SearchFoodstoreDto } from './dto/search-foodstore.dto';
import { PassThrough } from 'stream';


@Injectable()
export class FoodStoreService {
  constructor(
    private readonly storeRepository: FoodStoreRepository
  ) {}


  create(createStoreDto: CreateFoodStoreDto) {
    return this.storeRepository.save(createStoreDto);
  }

  findAll() {
    return this.storeRepository.find();
  }

  async findById(id: number) {
    const baseurl = 'https://storage.googleapis.com/mymoo/';
    const temp = await this.storeRepository.findById(id);
    if (!temp) {
      throw new Error('Store not found');
    }
    const result = {
      ...temp,
      foods: temp.foods.map(food => ({
        ...food,
        image_url: baseurl+food.image_url
      }))
    }
    return result
  }

  search(searchfoodstoredto: SearchFoodstoreDto, name?: string) {
    return this.storeRepository.search(searchfoodstoredto, name);
  }  


  remove(id: number) {
    return this.storeRepository.delete(id);
  }
}
