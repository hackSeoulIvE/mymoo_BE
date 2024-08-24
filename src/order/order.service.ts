import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { User } from 'src/user/entities/user.entity';


@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
  ) {}
  findOrderRecord(user_id: number) {
    return this.orderRepository.findOrderRecord(user_id);
  }
}
