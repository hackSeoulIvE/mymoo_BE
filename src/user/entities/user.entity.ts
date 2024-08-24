import { FoodstoreComment } from "src/foodstore/entities/foodstore_comment.entity";
import { UserOrder } from "src/order/entities/order.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity,OneToMany,PrimaryGeneratedColumn } from "typeorm";

@Entity({ schema: 'user', name: 'user'})
export class User {
    @PrimaryGeneratedColumn({name : 'id', type  : 'int'})
    id: number;

    @Column({name : 'user_id', type : 'varchar', length : 255, nullable : false})
    username: string;

    @Column({name : 'password', type : 'varchar', length : 255, nullable : false})
    password: string;

    @Column({name : 'nickname', type: 'varchar', length : 255, nullable : false})
    nickname: string;

    @OneToMany(() => UserOrder, order => order.user)
    orders: UserOrder[];

    @OneToMany(() => FoodstoreComment, comment => comment.user)
    comments: FoodstoreComment[];

    @CreateDateColumn()
    created_at: Date;

    @DeleteDateColumn()
    deleted_at: Date | null;
}
