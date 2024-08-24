import { CreateFoodDto } from './dto/create-food.dto';
import { FoodService } from './food.service';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post()
  create(@Body() createFoodDto: CreateFoodDto) {
    return this.foodService.create(createFoodDto);
  }

  @Get()
  findAll() {
    return this.foodService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodService.findById(+id);
  }

  @Get('store/:id')
  findByStoreId(@Param('id') id: string) {
    return this.foodService.findByStoreId(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodService.remove(+id);
  }
}
