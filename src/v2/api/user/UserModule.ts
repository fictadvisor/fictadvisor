import { Module } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { UserService } from './UserService';
import { UserController } from './UserController';
import { ConfigurationModule } from '../../config/ConfigModule';


@Module({
  controllers: [UserController],
  providers: [PrismaService, UserService],
  imports: [ConfigurationModule]
})
export class UserModule {}