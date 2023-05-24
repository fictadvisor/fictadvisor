import { Module } from '@nestjs/common';
import { JwtGuard } from 'src/v2/security/JwtGuard';
import { PermissionGuard } from 'src/v2/security/permission-guard/PermissionGuard';
import { GroupByDisciplineGuard } from '../security/group-guard/GroupByDisciplineGuard';
import { GroupByDisciplineTeacherGuard } from '../security/group-guard/GroupByDisciplineTeacherGuard';
import { GroupBySemesterLessonGuard } from '../security/group-guard/GroupBySemesterLessonGuard';
import { GroupByTemporaryLessonGuard } from '../security/group-guard/GroupByTemporaryLessonGuard';
import { JwtStrategy } from '../security/JwtStrategy';
import { TelegramGuard } from '../security/TelegramGuard';
import { PassportModule } from '@nestjs/passport';
import { ConfigurationModule } from './ConfigModule';
import { SecurityConfigService } from '../config/SecurityConfigService';
import { JwtModule } from '@nestjs/jwt';
import { PermissionService } from '../api/services/PermissionService';

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
    PermissionService,
    JwtModule,
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