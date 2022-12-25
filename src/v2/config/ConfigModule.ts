import { Module } from '@nestjs/common';
import { SecurityConfigService } from './SecurityConfigService';
import { ConfigModule } from '@nestjs/config';
import { TelegramConfigService } from './TelegramConfigService';

@Module({
  providers: [SecurityConfigService, TelegramConfigService],
  exports: [SecurityConfigService, TelegramConfigService]
})
export class ConfigurationModule extends ConfigModule {}