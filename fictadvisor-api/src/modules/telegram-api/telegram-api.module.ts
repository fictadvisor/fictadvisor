import { Module } from '@nestjs/common';
import { TelegramAPI } from './telegram-api';
import { ConfigurationModule } from '../../config/config.module';

@Module({
  providers: [TelegramAPI],
  exports: [TelegramAPI],
  imports: [ConfigurationModule],
})
export class TelegramApiModule {}
