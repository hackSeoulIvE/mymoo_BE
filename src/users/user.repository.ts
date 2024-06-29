import { MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository extends Repository<User> {
    constructor(
        @InjectRepository(User) private readonly repository: Repository<User>,
      ) {
        super(repository.target, repository.manager);
      }
}
