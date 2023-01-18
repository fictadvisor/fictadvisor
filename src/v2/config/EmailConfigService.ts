import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailConfigService {
  constructor(private configService: ConfigService) {}

  get host(): string {
    return this.configService.get<string>('email.host');
  }

  get port(): string {
    return this.configService.get<string>('email.port');
  }

  get username(): string {
    return this.configService.get<string>('email.username');
  }

  get password(): string {
    return this.configService.get<string>('email.password');
  }
}
