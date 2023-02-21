import { Module } from '@nestjs/common';
import { AuthController } from './AuthController';
import { AuthService } from './AuthService';
import { JwtModule } from '@nestjs/jwt';
import { ConfigurationModule } from '../../config/ConfigModule';
import { SecurityConfigService } from '../../config/SecurityConfigService';
import { LocalStrategy } from '../../security/LocalStrategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../../security/JwtStrategy';
import { EmailModule } from '../../email/EmailModule';
import { TelegramAPI } from '../../telegram/TelegramAPI';
import { PrismaModule } from '../../database/PrismaModule';
import { GroupModule } from '../group/GroupModule';
import { RoleService } from '../user/role/RoleService';
import { GrantService } from '../user/grant/GrantService';
import { UserModule } from "../user/UserModule";


@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, TelegramAPI],
  exports: [AuthService],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigurationModule],
      inject: [SecurityConfigService],
      useFactory: (configService: SecurityConfigService) => ({
        secret: configService.secret,
        signOptions: {
          expiresIn: configService.jwtTtl,
        },
      }),
    }),
    PassportModule,
    ConfigurationModule,
    EmailModule,
    PrismaModule,
    GroupModule,
    UserModule,
  ],
})
export class AuthModule {}