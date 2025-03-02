import { Module } from '@nestjs/common';
import { TelegramAPI } from './TelegramAPI';
import { ConfigurationModule } from '../../config/ConfigModule';

@Module({
  providers: [TelegramAPI],
  exports: [TelegramAPI],
  imports: [ConfigurationModule],
})
export class TelegramApiModule {}
