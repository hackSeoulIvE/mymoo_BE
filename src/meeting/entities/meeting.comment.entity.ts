import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Meeting } from "./meeting.entity";
import { User } from "src/users/entities/user.entity";

@Entity()
export class MeetingComment{
    @PrimaryGeneratedColumn({name : 'id', type  : 'int'}) 
    id: number;

    @Column({name : 'content', type : 'varchar', length : 2047})
    content: string;
    
    @ManyToOne(() => Meeting, (meeting) => meeting.comments, { onDelete: 'CASCADE' })
    @JoinColumn()
    meeting: Meeting;

    @ManyToOne(() => User, (user) => user.meetingcomments, { onDelete: 'SET NULL' })
    @JoinColumn()
    user: User;

    @OneToMany(() => MeetingComment, (childcomment) => childcomment.parent, { cascade: true })
    children: MeetingComment[];

    @ManyToOne(() => MeetingComment, (parentcomment) => parentcomment.children,  { onDelete: 'CASCADE' })
    @JoinColumn()
    parent: MeetingComment | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;
}