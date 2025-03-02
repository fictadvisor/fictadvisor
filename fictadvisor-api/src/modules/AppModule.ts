import { Module } from '@nestjs/common';
import Configuration from '../config/Configuration';
import { SecurityConfigService } from '../config/SecurityConfigService';
import { ConfigurationModule } from '../config/ConfigModule';
import { ApiModule } from './ApiModule';
import { EmailModule } from './email/EmailModule';
import { PrismaModule } from '../database/PrismaModule';
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
