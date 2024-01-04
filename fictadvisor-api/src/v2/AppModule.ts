import { Module } from '@nestjs/common';
import Configuration from './config/Configuration';
import { SecurityConfigService } from './config/SecurityConfigService';
import { ConfigurationModule } from './modules/ConfigModule';
import { ApiModule } from './api/ApiModule';
import { EmailModule } from './modules/EmailModule';
import { PrismaModule } from './modules/PrismaModule';
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