import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SecurityConfigService {
  constructor(private configService: ConfigService) {}

  get secret(): string {
    return this.configService.get<string>("security.secret")
  }
}