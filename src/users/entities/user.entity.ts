import { Delete } from "@nestjs/common";
import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { MeetingComment } from "src/meeting/entities/meeting.comment.entity";

@Entity({ schema: 'users', name: 'users'})
export class User {
    @PrimaryGeneratedColumn({name : 'id', type  : 'int'})
    id: number;

    @Column({name : 'user_id', type : 'varchar', length : 255})
    user_id: string;

    @Column({name : 'password', type : 'varchar', length : 255})
    password: string;

    @Column({name : 'email', type : 'varchar', length : 255})
    email: string;
    
    @Column({name : 'nickname', type : 'varchar', length : 255})
    nickname: string;
    
    @Column({name : 'made_meeting', type : 'varchar', length : 2047})
    made_meeting: string;
    
    @Column({name : 'posted_meeting', type : 'varchar', length : 2047})
    posted_meeting: string;

    @Column({name : 'liked_meeting', type : 'varchar', length : 2047})
    liked_meeting: string;

    @OneToMany(() => MeetingComment, (meeting) => meeting.user)
    meetingcomments: MeetingComment[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;

    @BeforeInsert()
    private async beforeInsert() {
      this.password = await bcrypt.hashSync(this.password, 10);
    }
}
