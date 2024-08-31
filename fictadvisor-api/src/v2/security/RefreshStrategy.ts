import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SecurityConfigService } from '../config/SecurityConfigService';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from './JwtPayload';
import { JwtStrategy } from './JwtStrategy';
import { RequestUtils } from '../utils/RequestUtils';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor (
    private securityConfig: SecurityConfigService,
    private jwtStrategy: JwtStrategy,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([RequestUtils.cookies('refresh_token')]),
      secretOrKey: securityConfig.secret,
      ignoreExpiration: false,
    });
  }

  async validate (payload: JwtPayload) {
    return this.jwtStrategy.validate(payload);
  }
}
