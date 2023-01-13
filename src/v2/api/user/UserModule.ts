import { Module } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { UserService } from './UserService';
import { UserController } from './UserController';
import { ConfigurationModule } from '../../config/ConfigModule';
import { GroupModule } from '../group/GroupModule';
import { DisciplineModule } from '../discipline/DisciplineModule';

@Module({
  controllers: [UserController],
  providers: [PrismaService, UserService],
  exports: [UserService],
  imports: [ConfigurationModule, GroupModule, DisciplineModule],
})
export class UserModule {}