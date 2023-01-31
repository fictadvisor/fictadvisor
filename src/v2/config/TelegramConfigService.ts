import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TelegramConfigService {
  constructor (
    private readonly configService: ConfigService
  ) {}

  get botToken () {
    return this.configService.get<string>('telegram.botToken');
  }

  get apiUrl () {
    return this.configService.get<string>('telegram.apiUrl');
  }
}
