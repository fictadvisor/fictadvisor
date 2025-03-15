import { Module } from '@nestjs/common';
import Configuration from '../config/configuration';
import { SecurityConfigService } from '../config/security-config.service';
import { ConfigurationModule } from '../config/config.module';
import { ApiModule } from './api.module';
import { EmailModule } from './email/email.module';
import { PrismaModule } from '../database/prisma.module';
import * as process from 'process';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigurationModule.forRoot({
      isGlobal: true,
      envFilePath: [`.${process.env.NODE_ENV}.env`, '.env'],
      load: [Configuration],
    }),
    ScheduleModule.forRoot(),
    ApiModule,
    EmailModule,
    PrismaModule,
  ],
  providers: [SecurityConfigService],
})
export class AppModule {}
