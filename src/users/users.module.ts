import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserTenantRole } from './entities/user-tenant-role.entity';
import { TenantsModule } from 'src/tenants/tenants.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserTenantRole]), TenantsModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
