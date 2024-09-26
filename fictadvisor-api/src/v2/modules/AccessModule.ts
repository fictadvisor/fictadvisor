import { Module } from '@nestjs/common';
import { JwtGuard } from 'src/v2/security/JwtGuard';
import { PermissionGuard } from 'src/v2/security/permission-guard/PermissionGuard';
import { GroupByDisciplineGuard } from '../security/group-guard/GroupByDisciplineGuard';
import { GroupByDisciplineTeacherGuard } from '../security/group-guard/GroupByDisciplineTeacherGuard';
import { GroupByEventGuard } from '../security/group-guard/GroupByEventGuard';
import { JwtStrategy } from '../security/JwtStrategy';
import { TelegramGuard } from '../security/TelegramGuard';
import { PassportModule } from '@nestjs/passport';
import { ConfigurationModule } from './ConfigModule';
import { SecurityConfigService } from '../config/SecurityConfigService';
import { JwtModule } from '@nestjs/jwt';
import { PermissionService } from '../api/services/PermissionService';
import { TelegramConfigService } from '../config/TelegramConfigService';
import { MultipleAccessGuard } from '../security/multiple-access-guard/MultipleAccessGuard';
import { GoogleStateGuard } from '../security/GoogleStateGuard';

@Module({
  providers: [
    PermissionGuard,
    JwtGuard,
    GroupByDisciplineGuard,
    GroupByDisciplineTeacherGuard,
    GroupByEventGuard,
    JwtStrategy,
    TelegramGuard,
    TelegramConfigService,
    PermissionService,
    MultipleAccessGuard,
    GoogleStateGuard,
  ],
  exports: [
    PermissionGuard, 
    JwtGuard, 
    GroupByDisciplineGuard, 
    GroupByDisciplineTeacherGuard,
    GroupByEventGuard,
    JwtStrategy,
    TelegramGuard,
    TelegramConfigService,
    PermissionService,
    MultipleAccessGuard,
    JwtModule,
    GoogleStateGuard,
  ],
  imports: [
    PassportModule,
    ConfigurationModule,
    JwtModule.registerAsync({
      imports: [ConfigurationModule],
      inject: [SecurityConfigService],
      useFactory: (configService: SecurityConfigService) => ({
        secret: configService.secret,
        signOptions: {
          expiresIn: configService.jwtTtl,
        },
      }),
    })],
})
export class AccessModule {}
