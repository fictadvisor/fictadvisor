import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SecurityConfigService } from '../config/SecurityConfigService';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from './JwtPayload';
import { PrismaService } from '../database/PrismaService';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private prisma: PrismaService,
    private securityConfig: SecurityConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: securityConfig.secret,
      ignoreExpiration: false
    });
  }

  async validate(payload: JwtPayload) {
    return await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      }
    });
  }
}