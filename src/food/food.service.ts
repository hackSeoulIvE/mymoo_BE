import { Injectable } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { FoodRepository } from './food.repository';

@Injectable()
export class FoodService {
  constructor(private readonly foodRepository: FoodRepository) {}

  create(createFoodData: CreateFoodDto) {
    return this.foodRepository.create(createFoodData);
  }

  findAll() {
    return this.foodRepository.find();
  }

  findById(id: number) {
    return this.foodRepository.findById(id);
  }

  findByStoreId(store_id: number) {
    return this.foodRepository.findByStoreId(store_id);
  }

  async remove(id: number) {
    return this.foodRepository.delete(id);
  }
}
