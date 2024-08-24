import { Column, CreateDateColumn, DeleteDateColumn, Entity,PrimaryGeneratedColumn } from "typeorm";

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

    @CreateDateColumn()
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;
}
