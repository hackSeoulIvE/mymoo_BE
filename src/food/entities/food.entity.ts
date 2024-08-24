import { Foodstore } from 'src/foodstore/entities/foodstore.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ schema: 'Foodstore', name: 'Foodstore' })
export class Food {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @ManyToOne(() => Foodstore, (foodStore) => foodStore.foods)
  foodstore: Foodstore;

  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ name: 'price', type: 'varchar', length: 255, nullable: false })
  price: string;

  @Column({
    name: 'discount_price',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  discount_price: string;

  @Column({
    name: 'description',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  description: string;

  @Column({ name: 'is_soldout', type: 'boolean' })
  is_soldout: boolean;

  @Column({ name: 'image_url', type: 'varchar', length: 255 })
  image_url: string;

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn()
  deleted_at: Date | null;
}
