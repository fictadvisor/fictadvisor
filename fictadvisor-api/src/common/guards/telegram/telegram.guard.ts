import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { TelegramConfigService } from '../../../config/telegram-config.service';

@Injectable()
export class TelegramGuard implements CanActivate {
  constructor (
    private telegramConfig: TelegramConfigService,
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
