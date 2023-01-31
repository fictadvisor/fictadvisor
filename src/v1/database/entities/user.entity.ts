import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserRole {
  User = 'user',
  Admin = 'admin',
}

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column({ name: 'first_name', type: 'varchar' })
    firstName: string;

  @Column({ name: 'last_name', type: 'varchar', nullable: true })
    lastName?: string;

  @Column({ type: 'varchar', nullable: true })
    username?: string;

  @Column({ type: 'varchar', nullable: true })
    image?: string;

  @Column({ name: 'telegram_id', unique: true })
    telegramId: number;

  @Column({ type: 'varchar', default: UserRole.User })
    role: UserRole;

  @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
