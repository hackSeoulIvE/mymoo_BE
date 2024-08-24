import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Foodstore } from './foodstore.entity';

@Entity({ schema: 'Foodstore_comment', name: 'Foodstore_comment' })
export class FoodstoreComment {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({
    name: 'description',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  description: string;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @ManyToOne(() => Foodstore, (foodstore) => foodstore.comments)
  foodstore: Foodstore;

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn()
  deleted_at: Date | null;
}
