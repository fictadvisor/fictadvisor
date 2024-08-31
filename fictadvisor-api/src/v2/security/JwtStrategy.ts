import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SecurityConfigService } from '../config/SecurityConfigService';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './JwtPayload';
import { User } from '@prisma/client';
import { UserRepository } from '../database/repositories/UserRepository';
import { RequestUtils } from '../utils/RequestUtils';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor (
    private securityConfig: SecurityConfigService,
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([RequestUtils.cookies('access_token')]),
      secretOrKey: securityConfig.secret,
      ignoreExpiration: false,
    });
  }

  async validate (payload: JwtPayload) {

    if (!payload) {
      throw new UnauthorizedException();
    }

    const user: User = await this.userRepository.findById(payload.sub);

    delete user.password;

    if (!user) {
      throw new UnauthorizedException();
    }

    if (user.lastPasswordChanged.getTime() > payload.createdAt) {
      throw new UnauthorizedException('Token is expired');
    }

    return user;
  }
}
