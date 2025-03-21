import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailConfigService {
  constructor (private configService: ConfigService) {}

  get host (): string {
    return this.configService.get<string>('email.host');
  }

  get port (): number {
    return this.configService.get<number>('email.port');
  }

  get username (): string {
    return this.configService.get<string>('email.username');
  }

  get password (): string {
    return this.configService.get<string>('email.password');
  }
}
