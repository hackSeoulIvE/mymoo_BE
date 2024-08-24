import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { UserRequest } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './order.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRequest])], 
  controllers: [],
  exports: [OrderService],
  providers: [OrderService, OrderRepository],
})
export class OrderModule {}
