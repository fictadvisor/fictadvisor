import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('refresh_tokens')
export class RefreshToken extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne((type) => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ unique: true, nullable: false })
  token: string;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date;
}
