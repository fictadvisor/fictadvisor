import { Module } from '@nestjs/common';
import Configuration from './config/Configuration';
import { SecurityConfigService } from './config/SecurityConfigService';
import { ConfigurationModule } from './modules/ConfigModule';
import { ApiModule } from './api/ApiModule';
import { EmailModule } from './modules/EmailModule';
import { PrismaModule } from './modules/PrismaModule';

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