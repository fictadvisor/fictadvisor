import { Module } from '@nestjs/common';
import { ConfigurationModule } from '../modules/ConfigModule';
import { PrismaModule } from '../modules/PrismaModule';
import { AccessModule } from '../modules/AccessModule';
import { GoogleAuthService } from './services/GoogleAuthService';
import { GoogleCalendarService } from './services/GoogleCalendarService';
import { GoogleController } from '../api/controllers/GoogleController';
import { GoogleAuthAPI } from './apis/GoogleAuthAPI';

@Module({
  controllers: [
    GoogleController,
  ],
  providers: [
    GoogleAuthService,
    GoogleCalendarService,
    GoogleAuthAPI,
  ],
  exports: [
    GoogleAuthService,
    GoogleCalendarService,
  ],
  imports: [ConfigurationModule, PrismaModule, AccessModule]
})
export class GoogleModule {}
