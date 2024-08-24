import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FoodstoreFood } from "./foodstore_food.entity";
import { FoodstoreComment } from "./foodstore_comment.entity";

@Entity({ schema: 'Foodstore', name: 'Foodstore'})
export class Foodstore {
    @PrimaryGeneratedColumn({name : 'id', type  : 'int'})
    id: number;

    @Column({name : 'name', type : 'varchar', length : 255, nullable : false})
    name: string;

    @Column({name : 'start_Time', type: 'time'})
    start_Time: string;

    @Column({name : 'end_Time', type: 'time'})
    end_Time: string;

    @Column({name : 'latitude', type: 'float'})
    latitude: number;

    @Column({name : 'longitude', type: 'float'})
    longitude: number;

    @Column({name : 'store_type', type: 'varchar', length : 255})
    store_type: string;

    @Column({name : 'location', type: 'varchar', length : 255})
    location: string;

    @OneToMany(() => FoodstoreFood, food => food.foodstore)
    foods: FoodstoreFood[];

    @OneToMany(() => FoodstoreComment, comment => comment.foodstore)
    comments: FoodstoreComment[];

    @CreateDateColumn()
    created_at: Date;

    @DeleteDateColumn()
    deleted_at: Date | null;
}
