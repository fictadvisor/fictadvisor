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
import { Teacher } from './teacher.entity';
import { FLOAT_TRANSFORMER } from '../database.util';

@Entity('teacher_stats')
export class StatEntry extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({
    type: 'numeric',
    precision: 4,
    scale: 2,
    transformer: FLOAT_TRANSFORMER,
  })
  value: number;

  @ManyToOne(type => Teacher)
  @JoinColumn({ name: 'teacher_id' })
  teacher: Teacher;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
