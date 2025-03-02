import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SecurityConfigService } from './SecurityConfigService';
import { EmailConfigService } from './EmailConfigService';
import { TelegramConfigService } from './TelegramConfigService';

@Module({
  providers: [SecurityConfigService, TelegramConfigService, EmailConfigService],
  exports: [SecurityConfigService, TelegramConfigService, EmailConfigService],
})
export class ConfigurationModule extends ConfigModule {}
