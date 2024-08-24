import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { User } from 'src/user/entities/user.entity';
import { FoodstoreFood } from 'src/foodstore/entities/foodstore_food.entity';
import { UserRequest } from './entities/order.entity';


@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
  ) {}
  findOrderRecord(user_id: number) {
    return this.orderRepository.findOrderRecord(user_id);
  }
  async foodOrder(user: User, food: FoodstoreFood) {
    const order = new UserRequest();

    order.user = user;
    order.food = food;
    return await this.orderRepository.save(order);
  }
}
