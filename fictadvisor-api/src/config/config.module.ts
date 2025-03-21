import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SecurityConfigService } from './security-config.service';
import { EmailConfigService } from './email-config.service';
import { TelegramConfigService } from './telegram-config.service';

@Module({
  providers: [SecurityConfigService, TelegramConfigService, EmailConfigService],
  exports: [SecurityConfigService, TelegramConfigService, EmailConfigService],
})
export class ConfigurationModule extends ConfigModule {}
