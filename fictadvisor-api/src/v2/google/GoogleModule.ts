import { Module } from '@nestjs/common';
import { ConfigurationModule } from '../modules/ConfigModule';
import { PrismaModule } from '../modules/PrismaModule';
import { GoogleAuthService } from './GoogleAuthService';
import { GoogleCalendarService } from './GoogleCalendarService';
import { GoogleController } from '../api/controllers/GoogleController';

@Module({
  controllers: [
    GoogleController,
  ],
  providers: [
    GoogleAuthService,
    GoogleCalendarService,
  ],
  exports: [
    GoogleAuthService,
    GoogleCalendarService,
  ],
  imports: [ConfigurationModule, PrismaModule]
})
export class GoogleModule {}
