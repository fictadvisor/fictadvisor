import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SecurityConfigService } from '../../../../config/security-config.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../types/jwt.payload';
import { User } from '@prisma/client/fictadvisor';
import { UserRepository } from '../../../../database/v2/repositories/user.repository';

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

    const user: User = await this.userRepository.findOne({ id: payload.sub });
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
