import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FLOAT_TRANSFORMER } from '../database.util';
import { Course } from './course.entity';
import { User } from './user.entity';

export enum ReviewState {
  PENDING = 'pending',
  APPROVED = 'approved',
  DECLINED = 'declined',
  OUTDATED = 'outdated',
}

@Entity('reviews')
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne((type) => Course)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @Column({
    type: 'numeric',
    precision: 4,
    scale: 2,
    transformer: FLOAT_TRANSFORMER,
  })
  rating: number;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'varchar', default: ReviewState.PENDING })
  state: ReviewState;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
