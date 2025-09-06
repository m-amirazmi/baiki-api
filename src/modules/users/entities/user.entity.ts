import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';
import { UserRole } from '../user.enum';

@Entity({ name: 'users' })
@Unique(['email'])
@Unique(['username'])
@Unique(['phoneNumber'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  username?: string;

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  fullName?: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: UserRole.TENANT })
  role: UserRole;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
