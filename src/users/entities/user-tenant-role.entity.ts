import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';
import { User } from './user.entity';
import { Tenant } from 'src/tenants/entities/tenant.entity';

export enum UserTenantRoleEnum {
  TENANT_ADMIN = 'tenantAdmin',
  OUTLET_ADMIN = 'outletAdmin',
  HELPDESK = 'helpdesk',
  TECHNICIAN = 'technician',
}

@Entity('user_tenant_roles')
@Unique(['user', 'tenant'])
export class UserTenantRole {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.tenantRoles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Tenant, (tenant) => tenant.tenantRoles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tenantId' })
  tenant: Tenant;

  @Column({
    type: 'enum',
    enum: UserTenantRoleEnum,
    default: UserTenantRoleEnum.HELPDESK,
  })
  role: UserTenantRoleEnum;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
