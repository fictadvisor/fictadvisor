import { Module } from '@nestjs/common';
import { TelegramGroupController } from '../api/controllers/TelegramGroupController';
import { TelegramGroupService } from '../api/services/TelegramGroupService';
import { TelegramGroupByIdPipe } from '../api/pipes/TelegramGroupByIdPipe';
import { PrismaModule } from './PrismaModule';
import { AccessModule } from './AccessModule';
import { MapperModule } from './MapperModule';
import { GroupModule } from './GroupModule';
import { ConfigurationModule } from './ConfigModule';

@Module({
  controllers: [TelegramGroupController],
  providers: [TelegramGroupService, TelegramGroupByIdPipe],
  exports: [TelegramGroupService, TelegramGroupByIdPipe],
  imports: [PrismaModule, AccessModule, MapperModule, GroupModule, ConfigurationModule],
})
export class TelegramGroupModule {}