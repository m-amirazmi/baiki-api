import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { UserTenantRole } from './user-tenant-role.entity';
import { Exclude } from 'class-transformer';

export enum UserTypeEnum {
  PLATFORM = 'platform',
  TENANT = 'tenant',
}

@Entity('users')
@Unique(['email', 'username', 'phoneNumber'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ default: true })
  isActive: boolean;

  @Exclude()
  @Column()
  hashedPassword: string;

  @Column({ type: 'enum', enum: UserTypeEnum, default: UserTypeEnum.TENANT })
  userType: UserTypeEnum;

  @OneToMany(() => UserTenantRole, (utr) => utr.user, { nullable: true })
  tenantRoles?: UserTenantRole[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
