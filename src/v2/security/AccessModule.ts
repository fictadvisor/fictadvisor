import { Module } from '@nestjs/common';
import { JwtGuard } from 'src/v2/security/JwtGuard';
import { PermissionGuard } from 'src/v2/security/permission-guard/PermissionGuard';
import { GroupByDisciplineGuard } from './group-guard/GroupByDisciplineGuard';
import { GroupByDisciplineTeacherGuard } from './group-guard/GroupByDisciplineTeacherGuard';
import { GroupBySemesterLessonGuard } from './group-guard/GroupBySemesterLessonGuard';
import { GroupByTemporaryLessonGuard } from './group-guard/GroupByTemporaryLessonGuard';
import { JwtStrategy } from './JwtStrategy';
import { TelegramGuard } from './TelegramGuard';
import { PassportModule } from '@nestjs/passport';
import { ConfigurationModule } from '../config/ConfigModule';
import { SecurityConfigService } from '../config/SecurityConfigService';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PermissionService } from './PermissionService';

@Module({
  providers: [
    PermissionGuard,
    JwtGuard,
    GroupByDisciplineGuard,
    GroupByDisciplineTeacherGuard,
    GroupBySemesterLessonGuard,
    GroupByTemporaryLessonGuard,
    JwtStrategy,
    TelegramGuard,
    JwtService,
    PermissionService,
  ],
  exports: [
    PermissionGuard, 
    JwtGuard, 
    GroupByDisciplineGuard, 
    GroupByDisciplineTeacherGuard,
    GroupBySemesterLessonGuard, 
    GroupByTemporaryLessonGuard,
    JwtStrategy,
    TelegramGuard,
    JwtService,
    PermissionService,
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