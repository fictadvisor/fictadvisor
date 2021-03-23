import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { FLOAT_TRANSFORMER } from "../database.util";
import { Course } from "./course.entity";

@Entity('reviews')
export class Review extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(course => Course)
    @JoinColumn({ name: 'course_id' })
    course: Course;

    @Column({ type: 'numeric', precision: 4, scale: 2, transformer: FLOAT_TRANSFORMER })
    rating: number;

    @Column({ type: 'text' })
    content: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
};