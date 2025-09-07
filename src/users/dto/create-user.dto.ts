import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserTypeEnum } from '../entities/user.entity';
import { UserTenantRoleEnum } from '../entities/user-tenant-role.entity';

export class CreateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string; // Must include country code, e.g. +60123456789

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsEnum(UserTypeEnum)
  userType?: UserTypeEnum;

  // only required if userType = TENANT
  @IsOptional()
  @IsString()
  tenantId?: string;

  @IsOptional()
  @IsEnum(UserTenantRoleEnum)
  role?: UserTenantRoleEnum;
}
