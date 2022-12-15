import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { ApiModule } from './api/api.module';
import { TelegramModule } from './telegram/telegram.module';
import { SitemapModule } from './sitemap/sitemap.module';

@Module({
  imports: [DatabaseModule, ApiModule, TelegramModule, SitemapModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
