import { AfterLoad, BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

const AVATAR_IMAGE_PLACEHOLDER = '/assets/avatar.png';

// TeacherView is dependant on this entity (see teacher-view.entity.ts)
@Entity('teachers')
export class Teacher extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', unique: true })
    link: string;

    @Column({ name: 'first_name', type: 'varchar' })
    firstName: string;

    @Column({ name: 'middle_name', type: 'varchar', nullable: true })
    middleName?: string;

    @Column({ name: 'last_name', type: 'varchar' })
    lastName: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ type: 'varchar', nullable: true })
    image?: string;

    @Column({ type: 'varchar', array: true, default: '{}' })
    tags: string[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @AfterLoad()
    private defaultImage() {
        if (this.image == null) {
            this.image = AVATAR_IMAGE_PLACEHOLDER;
        }
    }

    public getFullName() {
        if (this.middleName) {
            return `${this.lastName} ${this.firstName} ${this.middleName}`;
        }

        return `${this.lastName} ${this.firstName}`; 
    }
};