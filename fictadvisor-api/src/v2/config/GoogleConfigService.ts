import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleConfigService {
  constructor (private configService: ConfigService) {}

  get clientId (): string {
    return this.configService.get<string>('google.clientId');
  }

  get clientSecret (): string {
    return this.configService.get<string>('google.clientSecret');
  }

  get calendarRedirectUrl (): string {
    return this.configService.get<string>('frontBaseUrl') + '/schedule';
  }

  get calendarCallbackUri () {
    return this.configService.get<string>('baseUrl') + '/v2/google/callback/calendar';
  }
}
