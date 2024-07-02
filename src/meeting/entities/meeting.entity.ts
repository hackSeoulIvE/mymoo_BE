import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ schema: 'meetings', name: 'meetings'})
export class Meeting {
    @PrimaryGeneratedColumn({name : 'id', type  : 'int'})
    id: number;

    @Column({name : 'meeting_name', type : 'varchar', length : 255})
    meeting_name: string;

    @Column({name : 'is_flash', type : 'boolean'})
    is_flash: boolean;

    @Column({name : 'created_by', type : 'varchar', length : 255})
    created_by: string;

    @Column({name : 'meetingUsers', type : 'varchar', length : 2047})
    meetingUsers: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;
}
