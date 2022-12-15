import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { PrismaService } from '../database/PrismaService';
import { SecurityConfigService } from '../config/SecurityConfigService';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private securityConfig: SecurityConfigService
  ) {
    super({
      secretOrKey: securityConfig.secret,
    });
  }
}