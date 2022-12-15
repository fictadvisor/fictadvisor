import { Module } from '@nestjs/common';
import { PrismaService } from './database/PrismaService';
import { ConfigModule } from '@nestjs/config';
import Configuration from './config/Configuration';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [Configuration]
  })],
  providers: [PrismaService]
})
export class AppModule {}