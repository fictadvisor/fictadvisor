import { Module } from '@nestjs/common';
import { TelegramGroupProfile } from './telegram-group.profile';

@Module({
  providers: [TelegramGroupProfile],
  exports: [TelegramGroupProfile],
})
export class TelegramGroupMapperModule {}
