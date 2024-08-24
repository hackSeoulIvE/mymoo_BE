import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Foodstore } from "./foodstore.entity";
import { UserOrder } from "src/order/entities/order.entity";

@Entity({ schema: 'Foodstore_food', name: 'Foodstore_food'})
export class FoodstoreFood {
    @PrimaryGeneratedColumn({name : 'id', type  : 'int'})
    id: number;

    @Column({name : 'name', type : 'varchar', length : 255, nullable : false})
    name: string;

    @Column({name : 'price', type: 'int'})
    price: number;

    @Column({name : "discount_price", type: 'int'})
    discount_price: number;

    @Column({name : 'description', type: 'varchar', length : 255})
    description: string;

    @Column({name : 'is_soldout', type: 'boolean'})
    is_soldout: boolean;

    @Column({name : 'image_url', type: 'varchar', length : 255})
    image_url: string;

    @ManyToOne(() => Foodstore, foodstore => foodstore.foods)
    foodstore: Foodstore;

    @ManyToOne(() => UserOrder, order => order.food)
    orders: UserOrder[];

    @CreateDateColumn()
    created_at: Date;

    @DeleteDateColumn()
    deleted_at: Date | null;
}
