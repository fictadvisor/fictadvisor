import { Module } from '@nestjs/common';
import { AuthController } from '../api/controllers/AuthController';
import { AuthService } from '../api/services/AuthService';
import { ConfigurationModule } from './ConfigModule';
import { PassportModule } from '@nestjs/passport';
import { EmailModule } from './EmailModule';
import { TelegramAPI } from '../telegram/TelegramAPI';
import { PrismaModule } from './PrismaModule';
import { GroupModule } from './GroupModule';
import { UserModule } from './UserModule';
import { AccessModule } from 'src/v2/modules/AccessModule';
import { LocalStrategy } from 'src/v2/security/LocalStrategy';
import { LocalAuthGuard } from 'src/v2/security/LocalGuard';
import { RefreshStrategy } from '../security/RefreshStrategy';
import { RefreshGuard } from '../security/RefreshGuard';


@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    TelegramAPI,
    LocalStrategy,
    LocalAuthGuard,
    RefreshStrategy,
    RefreshGuard,
  ],
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
