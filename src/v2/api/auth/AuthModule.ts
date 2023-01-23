import { Module } from '@nestjs/common';
import { AuthController } from './AuthController';
import { AuthService } from './AuthService';
import { JwtModule } from '@nestjs/jwt';
import { ConfigurationModule } from '../../config/ConfigModule';
import { SecurityConfigService } from '../../config/SecurityConfigService';
import { LocalStrategy } from '../../security/LocalStrategy';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from '../../database/PrismaService';
import { JwtStrategy } from '../../security/JwtStrategy';
import { EmailModule } from '../../email/EmailModule';


@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, PrismaService],
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
  ],
})
export class AuthModule {}