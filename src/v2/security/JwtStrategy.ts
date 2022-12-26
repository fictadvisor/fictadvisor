import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SecurityConfigService } from '../config/SecurityConfigService';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './JwtPayload';
import { PrismaService } from '../database/PrismaService';
import { User } from '@prisma/client';

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
    const { password, ...user }: User = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      }
    });

    if (user.lastPasswordChanged.getTime() > payload.createdAt) {
      throw new UnauthorizedException('Token is expired');
    }

    return user;
  }
}