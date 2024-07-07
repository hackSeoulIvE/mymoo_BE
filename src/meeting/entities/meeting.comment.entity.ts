import { CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Meeting } from "./meeting.entity";

@Entity()
export class MeetingComment {
    @PrimaryGeneratedColumn({name : 'id', type  : 'int'}) 
    id: number;


    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;
}