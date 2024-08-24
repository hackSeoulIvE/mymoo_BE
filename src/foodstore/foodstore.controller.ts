import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { CreateFoodStoreDto } from './dto/create-foodstore.dto';
import { FoodStoreService } from './foodstore.service';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/security/auth.guard';

@ApiTags('Foodstore')
@Controller('store')
export class FoodStoreController {
  constructor(private readonly storeService: FoodStoreService) {}

  @Post()
  @ApiOperation({ summary: '가게 생성' })
  create(@Body() createStoreDto: CreateFoodStoreDto) {
    return this.storeService.create(createStoreDto);
  }

  @Get()
  @ApiOperation({ summary: '가게 모두 검색 (개발용)' })
  findAll() {
    return this.storeService.findAll();
  }


  @Get('storesearch')
  @ApiOperation({ summary: '가게 이름 검색 (빈 검색도 가능)' })
  @ApiQuery({ name: 'name', required: false })
  storesearch(@Query('name') name?: string){
    console.log("chk", name);
    return this.storeService.search(name);
  }  
  
  
  @Get('store:id')
  @ApiOperation({ summary: '가게 id로 검색' })
  findById(@Param('id') id: string) {
    return this.storeService.findById(+id);
  }

  @ApiOperation({ summary: '가게 제거' })
  @Delete('store:id')
  remove(@Param('id') id: string) {
    return this.storeService.remove(+id);
  }
}
