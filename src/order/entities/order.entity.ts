import { FoodstoreFood } from "src/foodstore/entities/foodstore_food.entity";
import { User } from "src/user/entities/user.entity";
import { CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ schema: 'User_Request', name: 'User_Requsest'})
export class UserRequest {
    @PrimaryGeneratedColumn({name : 'id', type  : 'int'})
    id: number;

    @ManyToOne(() => User, user => user.orders)
    user: User;

    @ManyToOne(() => FoodstoreFood, food => food.orders)
    food: FoodstoreFood;

    @CreateDateColumn()
    created_at: Date;

    @DeleteDateColumn()
    deleted_at: Date | null;
}
