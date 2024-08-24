import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CreateFoodStoreDto } from './dto/create-foodstore.dto';
import { FoodStoreFoodService } from './foodstore_food.service';
import { createFoodStoreFoodDto } from './dto/create-foodstore_food.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/security/auth.guard';
import { FoodIdDto } from './dto/get-foodid.dto';

@ApiTags('Food')
@Controller('food')
export class FoodStoreFoodController {
  constructor(private readonly storeService: FoodStoreFoodService) {}

  @Post()
  @ApiOperation({ summary: '가게 음식 생성' })
  create(@Body() createFoodDto: createFoodStoreFoodDto) {
    return this.storeService.create(createFoodDto);
  }

  @Get()
  @ApiOperation({ summary: '음식 모두 찾기 (개발용)' })
  findAll() {
    return this.storeService.findAll();
  }

  @Post('orderfood')
  @ApiOperation({ summary: '음식 주문' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('token')
  orderfood(@Req() req: Request, @Body() orderfoodDto: FoodIdDto) {
    const { user }: any = req;
    return this.storeService.foodOrder(user, orderfoodDto.food_id);
  }

  @ApiOperation({ summary: '음식 제거' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeService.remove(+id);
  }
}
