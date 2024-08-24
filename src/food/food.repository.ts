import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Food } from './entities/food.entity';

@Injectable()
export class FoodRepository extends Repository<Food> {
  constructor(
    @InjectRepository(Food) private readonly repository: Repository<Food>,
  ) {
    super(repository.target, repository.manager);
  }

  async findById(id: number) {
    return this.repository.findOne({ where: { id } });
  }

  async findByStoreId(store_id: number) {
    //createQueryBuilder()
    return this.repository.findOne({ where: { id: store_id } });
  }
}
