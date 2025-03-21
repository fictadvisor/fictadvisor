import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/v2/strategies/jwt.strategy';
import { ConfigurationModule } from '../../config/config.module';
import { SecurityConfigService } from '../../config/security-config.service';
import { PermissionModule } from '../permission/permission.module';

@Module({
  providers: [JwtStrategy],
  exports: [JwtStrategy, JwtModule, PermissionModule],
  imports: [
    PassportModule,
    ConfigurationModule,
    forwardRef(() => PermissionModule),
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
