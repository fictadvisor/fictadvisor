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
import { Subject } from './subject.entity';
import { Teacher } from './teacher.entity';

export enum CourseState {
  PENDING = 'pending',
  APPROVED = 'approved',
  DECLINED = 'declined',
}

@Entity('courses')
export class Course extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  link: string;

  @ManyToOne((type) => Teacher)
  @JoinColumn({ name: 'teacher_id' })
  teacher: Teacher;

  @ManyToOne((type) => Subject)
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;

  @Column({ default: false })
  recommended: boolean;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', default: CourseState.PENDING })
  state: CourseState;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
