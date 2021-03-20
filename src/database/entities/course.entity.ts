import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Subject } from "./subject.entity";
import { Teacher } from "./teacher.entity";

@Entity('courses')
export class Course extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(teacher => Teacher)
    @JoinColumn({ name: 'teacher_id' })
    teacher: Teacher;

    @ManyToOne(subject => Subject)
    @JoinColumn({ name: 'subject_id' })
    subject: Subject;

    @Column({ type: 'text' })
    description: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
};