import { Module } from '@nestjs/common';
import { AuthController } from './v2/auth.controller';
import { AuthService } from './v2/auth.service';
import { LocalStrategy } from 'src/modules/auth/v2/strategies/local.strategy';
import { ConfigurationModule } from '../../config/config.module';
import { PassportModule } from '@nestjs/passport';
import { EmailModule } from '../email/email.module';
import { PrismaModule } from '../../database/prisma.module';
import { GroupModule } from '../group/group.module';
import { UserModule } from '../user/user.module';
import { AccessModule } from 'src/modules/access/access.module';
import { TelegramApiModule } from '../telegram-api/telegram-api.module';


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
