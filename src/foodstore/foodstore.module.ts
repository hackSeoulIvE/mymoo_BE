import { Module } from '@nestjs/common';
import { FoodStoreController } from './foodstore.controller';
import { FoodStoreService } from './foodstore.service';
import { Foodstore } from './entities/foodstore.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodstoreComment } from './entities/foodstore_comment.entity';
import { FoodstoreFood } from './entities/foodstore_food.entity';
import { FoodStoreRepository } from './foodstore.repository';
import { FoodStoreFoodController } from './foodstore_food.controller';
import { FoodStoreFoodService } from './foodstore_food.service';
import { FoodStoreFoodRepository } from './foodstore_food.repository';
import { FoodStoreCommentController } from './foodstore_comment.controller';
import { FoodStoreCommentService } from './foodstore_comment.service';
import { FoodStoreCommentRepository } from './foodstore_comment.repository';
import { UserModule } from 'src/user/user.module';
import { OrderModule } from 'src/order/order.module';


@Module({
  imports: [TypeOrmModule.forFeature([Foodstore]), TypeOrmModule.forFeature([FoodstoreComment]), TypeOrmModule.forFeature([FoodstoreFood]), UserModule, OrderModule],
  controllers: [FoodStoreController, FoodStoreFoodController, FoodStoreCommentController],
  providers: [FoodStoreService, FoodStoreFoodService, FoodStoreCommentService, FoodStoreRepository, FoodStoreFoodRepository, FoodStoreCommentRepository],
})
export class FoodStoreModule {}
