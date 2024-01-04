import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SecurityConfigService } from '../config/SecurityConfigService';
import { EmailConfigService } from '../config/EmailConfigService';
import { TelegramConfigService } from '../config/TelegramConfigService';

@Module({
  providers: [SecurityConfigService, TelegramConfigService, EmailConfigService],
  exports: [SecurityConfigService, TelegramConfigService, EmailConfigService],
})
export class ConfigurationModule extends ConfigModule {}
