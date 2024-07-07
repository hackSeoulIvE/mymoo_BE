import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { MeetingComment } from "./meeting.comment.entity";

@Entity()
export class Meeting{
    @PrimaryGeneratedColumn({name : 'id', type  : 'int'})
    id: number;

    @Column({name : 'meeting_name', type : 'varchar', length : 255})
    meeting_name: string;

    @Column({name : 'meeting_description', type : 'varchar', length : 2047})
    meeting_description: string;

    @OneToMany(() => MeetingComment, (comment) => comment.meeting)
    comments: MeetingComment[];

    @Column({name : 'type', type : 'varchar', length : 255})
    type: string;

    @Column({name : 'is_flash', type : 'boolean'})
    is_flash: boolean;

    @Column({name : 'created_by', type : 'varchar', length : 255})
    created_by: string;

    @Column({name : 'meetingUsers', type : 'varchar', length : 2047})
    meetingUsers: string;

    @Column({name : 'deadline', type: 'timestamp' })
    deadline: Date;

    @Column({name : 'meeting_date', type: 'timestamp' })
    meeting_date: Date;

    @Column({ name: 'min_user', type: 'int' })
    min_user: number;

    @Column({ name: 'max_user', type: 'int' })
    max_user: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;
}
