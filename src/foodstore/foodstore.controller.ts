import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { StoreService } from './foodstore.service';
import { CreateFoodStoreDto } from './dto/create-foodstore.dto';
import { FoodStoreService } from './foodstore.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Foodstores')
@Controller('store')
export class FoodStoreController {
  constructor(private readonly storeService: FoodStoreService) {}

  @Post()
  create(@Body() createStoreDto: CreateFoodStoreDto) {
    return this.storeService.create(createStoreDto);
  }

  @Get()
  findAll() {
    return this.storeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeService.remove(+id);
  }
}
