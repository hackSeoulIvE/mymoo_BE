import { Injectable } from '@nestjs/common';
import { FoodStoreCommentRepository } from './foodstore_comment.repository';
import { createFoodstoreCommentDto } from './dto/create-foodstore_comment.dto';
import { FoodstoreComment } from './entities/foodstore_comment.entity';
import { find } from 'rxjs';
import { FoodStoreService } from './foodstore.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';



@Injectable()
export class FoodStoreCommentService {
  constructor(
    private readonly commentRepository: FoodStoreCommentRepository,
    private readonly storeService: FoodStoreService,
    private readonly userService: UserService,
) {}

  async create(user: User, createCommentDto: createFoodstoreCommentDto) {
    const comment = new FoodstoreComment();
    const store = await this.storeService.findById(createCommentDto.foodstore_id);

    if(!store) {
      return null;
    }
    
    comment.description = createCommentDto.description;
    comment.foodstore = store;
    comment.user = user;

    return this.commentRepository.save(comment);
  }

  findAll() {
    return this.commentRepository.find();
  }

  findById(id: number) {
    return this.commentRepository.findById(id);
  }



  remove(id: number) {
    return this.commentRepository.delete(id);
  }
}
