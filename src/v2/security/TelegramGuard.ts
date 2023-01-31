import { type CanActivate, type ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { type Observable } from 'rxjs';
import { type Request } from 'express';
import { TelegramConfigService } from '../config/TelegramConfigService';

@Injectable()
export class TelegramGuard implements CanActivate {
  constructor (
    private readonly telegramConfig: TelegramConfigService
  ) {}

  canActivate (context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const header: string = request.headers.authorization ?? '';

    if (header !== `Telegram ${this.telegramConfig.botToken}`) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
