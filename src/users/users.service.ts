import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserTypeEnum } from './entities/user.entity';
import { PasswordUtil } from 'utils/password.util';
import { UserTenantRole } from './entities/user-tenant-role.entity';
import { TenantsService } from 'src/tenants/tenants.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(UserTenantRole)
    private readonly userTenantRoleRepo: Repository<UserTenantRole>,
    private readonly tenantsService: TenantsService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, phoneNumber, username, password, userType, tenantId, role } =
      createUserDto;

    const existingUser = await this.userRepo.findOne({
      where: [{ email }, { phoneNumber }, { username }],
    });
    if (existingUser) {
      throw new Error(
        'User with the same email, phone number, or username already exists',
      );
    }

    const hashedPassword = await PasswordUtil.hash(password);
    const user = this.userRepo.create({
      ...createUserDto,
      hashedPassword,
      userType: userType ?? UserTypeEnum.TENANT,
    });
    const savedUser = await this.userRepo.save(user);

    switch (savedUser.userType) {
      case UserTypeEnum.TENANT:
        if (tenantId && role) {
          const tenant = await this.tenantsService.findOne(tenantId);
          if (!tenant) {
            throw new Error('Tenant not found');
          }
          const userTenantRole = this.userTenantRoleRepo.create({
            user: savedUser,
            tenant,
            role,
          });
          await this.userTenantRoleRepo.save(userTenantRole);
        }
        break;
      case UserTypeEnum.PLATFORM:
      default:
        break;
    }
    return savedUser;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
