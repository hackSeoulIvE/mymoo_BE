import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFoodStoreDto } from './dto/create-foodstore.dto';
import { FoodStoreRepository } from './foodstore.repository';
import { SearchFoodstoreDto } from './dto/search-foodstore.dto';
import { PassThrough } from 'stream';
import { plainToClass } from 'class-transformer';
import { ReturnFoodDto } from './dto/return-foodstore.dto';


@Injectable()
export class FoodStoreService {
  constructor(
    private readonly storeRepository: FoodStoreRepository
  ) {}


  create(createStoreDto: CreateFoodStoreDto) {
    return this.storeRepository.save(createStoreDto);
  }

  findAll() {
    return this.storeRepository.find();
  }

  async findById(id: number) {
    const temp = await this.storeRepository.findById(id);
    if (!temp) {
      throw new Error('Store not found');
    }
    
    const filteredResult = this.filterSensitiveData(temp, [
      'comments.user.password',
      'comments.user.refreshtoken',
      'comments.user.refreshTokenExpiresIn'
    ]);

    
    return filteredResult;
  }

  search(searchfoodstoredto: SearchFoodstoreDto, name?: string) {
    return this.storeRepository.search(searchfoodstoredto, name);
  }  


  remove(id: number) {
    return this.storeRepository.delete(id);
  }

  private filterSensitiveData<T>(data: T, sensitiveFields: string[]): T {
    const filteredData = JSON.parse(JSON.stringify(data)); // Deep copy to avoid mutating the original object
  
    sensitiveFields.forEach(field => {
      const keys = field.split('.');
      let currentLevel = filteredData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (currentLevel[keys[i]]) {
          currentLevel = currentLevel[keys[i]];
        }
      }
  
      if (currentLevel) {
        delete currentLevel[keys[keys.length - 1]];
      }
    });
  
    return filteredData as T;
  }
}
