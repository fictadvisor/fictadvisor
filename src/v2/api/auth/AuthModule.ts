import { Module } from '@nestjs/common';
import { AuthController } from './AuthController';
import { AuthService } from './AuthService';
import { ConfigurationModule } from '../../config/ConfigModule';
import { PassportModule } from '@nestjs/passport';
import { EmailModule } from '../../email/EmailModule';
import { TelegramAPI } from '../../telegram/TelegramAPI';
import { PrismaModule } from '../../database/PrismaModule';
import { GroupModule } from '../group/GroupModule';
import { UserModule } from '../user/UserModule';
import { AccessModule } from 'src/v2/security/AccessModule';
import { LocalStrategy } from 'src/v2/security/LocalStrategy';
import { LocalAuthGuard } from 'src/v2/security/LocalGuard';


@Module({
  controllers: [AuthController],
  providers: [AuthService, TelegramAPI, LocalStrategy, LocalAuthGuard],
  exports: [AuthService],
  imports: [
    PassportModule,
    ConfigurationModule,
    EmailModule,
    PrismaModule,
    GroupModule,
    UserModule,
    AccessModule,
  ],
})
export class AuthModule {}