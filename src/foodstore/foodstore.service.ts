import { Injectable } from '@nestjs/common';
import { CreateFoodStoreDto } from './dto/create-foodstore.dto';
import { FoodStoreRepository } from './foodstore.repository';


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

  findById(id: number) {
    return this.storeRepository.findById(id);
  }

  search(name?: string) {
    return this.storeRepository.search(name);
  }



  remove(id: number) {
    return this.storeRepository.delete(id);
  }
}
