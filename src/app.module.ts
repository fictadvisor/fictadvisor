import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { ApiModule } from './api/api.module';
import { TelegramModule } from './telegram/telegram.module';

@Module({
  imports: [DatabaseModule, ApiModule, TelegramModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
