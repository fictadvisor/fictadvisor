import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../api/services/AuthService';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor (private authService: AuthService) {
    super();
  }

  async validate (username: string, password: string): Promise<any> {
    return this.authService.validateUser(username, password);
  }
}