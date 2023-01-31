import { Module } from '@nestjs/common';
import { PrismaService } from './database/PrismaService';
import Configuration from './config/Configuration';
import { SecurityConfigService } from './config/SecurityConfigService';
import { ConfigurationModule } from './config/ConfigModule';
import { ApiModule } from './api/ApiModule';
import { EmailModule } from './email/EmailModule';

@Module({
  imports: [
    ConfigurationModule.forRoot({
      isGlobal: true,
      load: [Configuration],
    }),
    ApiModule,
    EmailModule,
  ],
  providers: [PrismaService, SecurityConfigService],
})
export class AppModule {}