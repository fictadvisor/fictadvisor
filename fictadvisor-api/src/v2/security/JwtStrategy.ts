import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SecurityConfigService } from '../config/SecurityConfigService';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './JwtPayload';
import { User } from '@prisma/client';
import { UserRepository } from '../database/repositories/UserRepository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor (
    private securityConfig: SecurityConfigService,
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: securityConfig.secret,
      ignoreExpiration: false,
    });
  }

  async validate (payload: JwtPayload) {

    if (!payload) {
      throw new UnauthorizedException();
    }

    const user: User = await this.userRepository.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }

    delete user.password;

    if (user.lastPasswordChanged.getTime() > payload.createdAt) {
      throw new UnauthorizedException('Token is expired');
    }

    return user;
  }
}
