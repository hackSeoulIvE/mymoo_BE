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
        queryBuilder.select(['food', 'foodstore', 'order.created_at', 'order.id'])
        queryBuilder.orderBy('order.created_at', 'DESC')

        const result = await queryBuilder.getMany()
        return result.map((order) => {
            return {
                ...order,
                food: {
                    ...order.food,
                    foodstore: {
                        ...order.food.foodstore,
                        is_open: this.IsOpen(order.food.foodstore.start_Time, order.food.foodstore.end_Time),
                    }
                },
            };
        });
    }

    private IsOpen(openTime, closeTime) {
        const now = new Date();
        const currentTime = now.toTimeString().substr(0, 8); 
        if (openTime <= currentTime && closeTime >= currentTime) {
            return true
        }
        return false
    }
}