import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [DatabaseModule, ApiModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
