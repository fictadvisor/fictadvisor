import { Module } from '@nestjs/common';
import { SecurityConfigService } from '../config/security-config.service';
import { ConfigurationModule } from '../config/config.module';
import Configuration from '../config/configuration.constant';
import { ApiModule } from './api.module';
import { EmailModule } from './email/email.module';
import { PrismaModule } from '../database/prisma.module';
import * as process from 'process';
import { ScheduleModule } from '@nestjs/schedule';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

@Module({
  imports: [
    ConfigurationModule.forRoot({
      isGlobal: true,
      envFilePath: [`.${process.env.NODE_ENV}.env`, '.env'],
      load: [Configuration],
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    ScheduleModule.forRoot(),
    ApiModule,
    EmailModule,
    PrismaModule,
  ],
  providers: [SecurityConfigService],
})
export class AppModule {}
