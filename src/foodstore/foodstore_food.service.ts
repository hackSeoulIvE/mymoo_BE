import { Injectable, NotFoundException } from '@nestjs/common';
import { FoodStoreFoodRepository } from './foodstore_food.repository';
import { createFoodStoreFoodDto } from './dto/create-foodstore_food.dto';
import { FoodstoreFood } from './entities/foodstore_food.entity';
import { FoodStoreService } from './foodstore.service';
import { OrderService } from 'src/order/order.service';
import { User } from 'src/user/entities/user.entity';
import { Not } from 'typeorm';
import { find } from 'rxjs';


@Injectable()
export class FoodStoreFoodService {
  constructor(
    private readonly foodRepository: FoodStoreFoodRepository,
    private readonly storeService: FoodStoreService,
    private readonly orderService: OrderService,
  ) {}

  async create(createFoodDto: createFoodStoreFoodDto) {
    const baseurl = 'https://storage.googleapis.com/mymoo/';
    const food = new FoodstoreFood();
    const store = await this.storeService.findById(createFoodDto.foodstore_id);

    if (!store) {
      throw new Error('Store not found');
    }

    food.name = createFoodDto.name;
    food.price = createFoodDto.price;
    food.discount_price = createFoodDto.discount_price;
    food.description = createFoodDto.description;
    food.is_soldout = createFoodDto.is_soldout;
    food.image_url = baseurl+createFoodDto.image_url;
    food.foodstore = store;

    await this.foodRepository.save(food);
    return this.storeService.findById(createFoodDto.foodstore_id);
  }

  async foodOrder(user: User, food_id: number) {
    const food = await this.foodRepository.findById(food_id);
    
    if (!food) {
      throw new NotFoundException('Food not found');
    }
    return await this.orderService.foodOrder(user, food);
  }

  findById(id: number) {
    return this.foodRepository.findById(id);
  }

  findAll() {
    return this.foodRepository.find();
  }

  async update(id: number, updateFoodDto: createFoodStoreFoodDto) {
    let food = await this.foodRepository.findById(id);
    food.description = updateFoodDto.description;
    return this.foodRepository.update(id, food);
  }


  remove(id: number) {
    return this.foodRepository.delete(id);
  }
}
