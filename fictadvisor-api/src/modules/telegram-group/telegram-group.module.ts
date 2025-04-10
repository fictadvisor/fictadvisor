import { Module } from '@nestjs/common';
import { TelegramGroupController } from './v2/telegram-group.controller';
import { TelegramGroupService } from './v2/telegram-group.service';
import { PrismaModule } from '../../database/prisma.module';
import { AccessModule } from '../access/access.module';
import { GroupModule } from '../group/group.module';
import { ConfigurationModule } from '../../config/config.module';
import { TelegramGroupMapperModule } from './v2/mappers/telegram-group-mapper.module';

@Module({
  controllers: [TelegramGroupController],
  providers: [TelegramGroupService],
  exports: [TelegramGroupService],
  imports: [PrismaModule, AccessModule, GroupModule, ConfigurationModule, TelegramGroupMapperModule],
})
export class TelegramGroupModule {}
