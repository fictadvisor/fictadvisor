import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Teacher } from './teacher.entity';

export enum TeacherContactState {
    PENDING = 'pending',
    APPROVED = 'approved',
    DECLINED = 'declined',
};

@Entity('teacher_contacts')
export class TeacherContact extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar' })
    value: string;

    @ManyToOne(type => Teacher)
    @JoinColumn({ name: 'teacher_id' })
    teacher: Teacher;

    @Column({ type: 'varchar', default: TeacherContactState.PENDING })
    state: TeacherContactState;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
};