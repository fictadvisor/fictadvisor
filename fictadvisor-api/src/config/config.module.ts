import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SecurityConfigService } from './security-config.service';
import { EmailConfigService } from './email-config.service';
import { TelegramConfigService } from './telegram-config.service';
import { MinioConfigService } from './minio-config.service';

@Module({
  providers: [SecurityConfigService, TelegramConfigService, EmailConfigService, MinioConfigService],
  exports: [SecurityConfigService, TelegramConfigService, EmailConfigService, MinioConfigService],
})
export class ConfigurationModule extends ConfigModule {}
