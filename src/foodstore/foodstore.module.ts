import { Module } from '@nestjs/common';
import { StoreService } from './foodstore.service';
import { StoreController } from './foodstore.controller';

@Module({
  controllers: [StoreController],
  providers: [StoreService],
})
export class StoreModule {}
