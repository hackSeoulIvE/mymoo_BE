import { Module } from '@nestjs/common';
import { FoodStoreController } from './foodstore.controller';
import { FoodStoreService } from './foodstore.service';
import { Foodstore } from './entities/foodstore.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodstoreComment } from './entities/foodstore_comment.entity';
import { FoodstoreFood } from './entities/foodstore_food.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Foodstore])],
  controllers: [FoodStoreController],
  providers: [FoodStoreService],
})
export class FoodStoreModule {}
