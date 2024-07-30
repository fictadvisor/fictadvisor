import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleConfigService {
  constructor (private configService: ConfigService) {}

  get clientId(): string {
    return this.configService.get<string>('google.clientId');
  }

  get clientSecret(): string {
    return this.configService.get<string>('google.clientSecret');
  }

  get frontRedirectUrl(): string {
    return this.configService.get<string>('google.frontRedirectUrl');
  }
}
