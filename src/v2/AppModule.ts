import { Module } from '@nestjs/common';
import Configuration from './config/Configuration';
import { SecurityConfigService } from './config/SecurityConfigService';
import { ConfigurationModule } from './config/ConfigModule';
import { ApiModule } from './api/ApiModule';
import { EmailModule } from './email/EmailModule';
import { PrismaModule } from './database/PrismaModule';

@Module({
  imports: [
    ConfigurationModule.forRoot({
      isGlobal: true,
      load: [Configuration],
    }),
    ApiModule,
    EmailModule,
    PrismaModule,
  ],
  providers: [SecurityConfigService],
})
export class AppModule {}