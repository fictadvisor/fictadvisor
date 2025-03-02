import { Module } from '@nestjs/common';
import { AuthController } from './v2/AuthController';
import { AuthService } from './v2/AuthService';
import { LocalStrategy } from 'src/modules/auth/v2/strategies/LocalStrategy';
import { ConfigurationModule } from '../../config/ConfigModule';
import { PassportModule } from '@nestjs/passport';
import { EmailModule } from '../email/EmailModule';
import { PrismaModule } from '../../database/PrismaModule';
import { GroupModule } from '../group/GroupModule';
import { UserModule } from '../user/UserModule';
import { AccessModule } from 'src/modules/access/AccessModule';
import { TelegramApiModule } from '../telegram-api/TelegramApiModule';


@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
  imports: [
    PassportModule,
    ConfigurationModule,
    EmailModule,
    TelegramApiModule,
    PrismaModule,
    GroupModule,
    UserModule,
    AccessModule,
  ],
})
export class AuthModule {}
