import { Module } from '@nestjs/common';
import { TelegramGroupController } from './v2/TelegramGroupController';
import { TelegramGroupService } from './v2/TelegramGroupService';
import { PrismaModule } from '../../database/PrismaModule';
import { AccessModule } from '../access/AccessModule';
import { MapperModule } from '../../common/mappers/MapperModule';
import { GroupModule } from '../group/GroupModule';
import { ConfigurationModule } from '../../config/ConfigModule';

@Module({
  controllers: [TelegramGroupController],
  providers: [TelegramGroupService],
  exports: [TelegramGroupService],
  imports: [PrismaModule, AccessModule, MapperModule, GroupModule, ConfigurationModule],
})
export class TelegramGroupModule {}
