import { Module } from '@nestjs/common';
import { ConfigurationModule } from '../modules/ConfigModule';
import { PrismaModule } from '../modules/PrismaModule';
import { AccessModule } from '../modules/AccessModule';
import { GoogleAuthService } from './services/GoogleAuthService';
import { GoogleCalendarService } from './services/GoogleCalendarService';
import { GoogleController } from '../api/controllers/GoogleController';
import { GoogleAuthAPI } from './apis/GoogleAuthAPI';
import { GoogleCalendarAPI } from './apis/GoogleCalendarAPI';
import { DateModule } from '../utils/date/DateModule';

@Module({
  controllers: [
    GoogleController,
  ],
  providers: [
    GoogleAuthService,
    GoogleCalendarService,
    GoogleAuthAPI,
    GoogleCalendarAPI,
  ],
  exports: [
    GoogleAuthService,
    GoogleCalendarService,
  ],
  imports: [ConfigurationModule, PrismaModule, AccessModule, DateModule],
})
export class GoogleModule {}
