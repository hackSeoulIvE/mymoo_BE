import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ schema: 'groups', name: 'groups'})
export class Group {
    @PrimaryGeneratedColumn({name : 'id', type  : 'int'})
    id: number;

    @Column({name : 'group_name', type : 'varchar', length : 255})
    group_name: string;

    @Column({name : 'is_flash', type : 'boolean'})
    is_flash: boolean;

    @Column({name : 'created_by', type : 'varchar', length : 255})
    created_by: string;

    @Column({name : 'groupUsers', type : 'varchar', length : 2047})
    groupUsers: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;
}
