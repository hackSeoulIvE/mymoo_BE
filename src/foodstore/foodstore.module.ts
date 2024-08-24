import { Module } from '@nestjs/common';
import { FoodStoreController } from './foodstore.controller';
import { FoodStoreService } from './foodstore.service';
import { Foodstore } from './entities/foodstore.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Foodstore])],
  controllers: [FoodStoreController],
  providers: [FoodStoreService],
})
export class FoodStoreModule {}
