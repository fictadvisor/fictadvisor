import { Module } from '@nestjs/common';
import { SecurityConfigService } from './SecurityConfigService';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [SecurityConfigService],
  exports: [SecurityConfigService]
})
export class ConfigurationModule extends ConfigModule {}