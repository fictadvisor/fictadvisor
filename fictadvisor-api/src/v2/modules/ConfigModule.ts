import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SecurityConfigService } from '../config/SecurityConfigService';
import { EmailConfigService } from '../config/EmailConfigService';
import { TelegramConfigService } from '../config/TelegramConfigService';
import { GoogleConfigService } from '../config/GoogleConfigService';

@Module({
  providers: [SecurityConfigService, TelegramConfigService, EmailConfigService, GoogleConfigService],
  exports: [SecurityConfigService, TelegramConfigService, EmailConfigService, GoogleConfigService],
})
export class ConfigurationModule extends ConfigModule {}
