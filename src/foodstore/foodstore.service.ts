import { Injectable } from '@nestjs/common';
import { CreateFoodStoreDto } from './dto/create-foodstore.dto';


@Injectable()
export class FoodStoreService {
  create(createStoreDto: CreateFoodStoreDto) {
    return 'This action adds a new store';
  }

  findAll() {
    return `This action returns all store`;
  }

  findOne(id: number) {
    return `This action returns a #${id} store`;
  }


  remove(id: number) {
    return `This action removes a #${id} store`;
  }
}
