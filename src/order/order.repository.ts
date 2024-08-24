import { Injectable } from "@nestjs/common";
import { UserOrder } from "./entities/order.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class OrderRepository extends Repository<UserOrder> {
    constructor(
        @InjectRepository(UserOrder) private readonly repository: Repository<UserOrder>,
    ) {
        super(repository.target, repository.manager);
    }


    async findOrderRecord(user_id: number) {
        const queryBuilder = this.repository.createQueryBuilder('order')

        queryBuilder.leftJoinAndSelect('order.user', 'user')
        queryBuilder.leftJoinAndSelect('order.food', 'food')
        queryBuilder.where('user.id = :user_id', { user_id })

        return await queryBuilder.getMany()
    }
}