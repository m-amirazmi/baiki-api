import { UserTenantRole } from 'src/users/entities/user-tenant-role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tenants')
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  code: string;

  @Column({ nullable: false })
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => UserTenantRole, (utr) => utr.user, { cascade: true })
  tenantRoles: UserTenantRole[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
