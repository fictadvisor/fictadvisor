import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Teacher } from "./teacher.entity";

export enum TeacherContactType {
    PhoneNumber = 'phone_number',
    Email = 'email',
    Telegram = 'telegram',
    Viber = 'viber',
    Website = 'website'
};

@Entity('teacher_contacts')
export class TeacherContact extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    type: TeacherContactType;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar' })
    value: string;

    @ManyToOne(teacher => Teacher)
    @JoinColumn({ name: 'teacher_id' })
    teacher: Teacher;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
};