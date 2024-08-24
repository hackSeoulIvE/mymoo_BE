import { Injectable } from "@nestjs/common";
import { UserRequest } from "./entities/order.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class OrderRepository extends Repository<UserRequest> {
    constructor(
        @InjectRepository(UserRequest) private readonly repository: Repository<UserRequest>,
    ) {
        super(repository.target, repository.manager);
    }


    async findOrderRecord(user_id: number) {
        const queryBuilder = this.repository.createQueryBuilder('order')
        queryBuilder.leftJoinAndSelect('order.user', 'user')
        queryBuilder.leftJoinAndSelect('order.food', 'food')
        queryBuilder.leftJoinAndSelect('food.foodstore', 'foodstore')
        queryBuilder.where('user.id = :user_id', {user_id: user_id })
        queryBuilder.select(['food', 'foodstore', 'order.created_at'])
        queryBuilder.orderBy('order.created_at', 'DESC')

        return await queryBuilder.getMany()
    }
}