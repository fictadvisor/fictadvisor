import { forwardRef, Module } from '@nestjs/common';
import { JwtGuard } from 'src/v2/security/JwtGuard';
import { PermissionGuard } from 'src/v2/security/permission-guard/PermissionGuard';
import { UserModule } from '../api/user/UserModule';
import { GroupByDisciplineGuard } from './group-guard/GroupByDisciplineGuard';
import { GroupByDisciplineTeacherGuard } from './group-guard/GroupByDisciplineTeacherGuard';
import { GroupBySemesterLessonGuard } from './group-guard/GroupBySemesterLessonGuard';
import { GroupByTemporaryLessonGuard } from './group-guard/GroupByTemporaryLessonGuard';
import { JwtStrategy } from './JwtStrategy';
import { TelegramGuard } from './TelegramGuard';
import { PrismaModule } from '../database/PrismaModule';
import { PassportModule } from '@nestjs/passport';
import { ConfigurationModule } from '../config/ConfigModule';
import { SecurityConfigService } from '../config/SecurityConfigService';
import { JwtModule, JwtService } from '@nestjs/jwt';

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
  ],
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    PrismaModule,
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