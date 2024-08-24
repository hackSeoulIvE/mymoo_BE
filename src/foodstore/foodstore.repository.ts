import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Foodstore } from './entities/foodstore.entity';

@Injectable()
export class StoreRepository extends Repository<Foodstore> {
  constructor(
    @InjectRepository(Foodstore)
    private readonly repository: Repository<Foodstore>,
  ) {
    super(repository.target, repository.manager);
  }
}
