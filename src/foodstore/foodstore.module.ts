import { Module } from '@nestjs/common';
import { StoreService } from './foodstore.service';
import { StoreController } from './foodstore.controller';
import { StoreRepository } from './foodstore.repository';

@Module({
  controllers: [StoreController],
  providers: [StoreService, StoreRepository],
  exports: [StoreService],
})
export class StoreModule {}
