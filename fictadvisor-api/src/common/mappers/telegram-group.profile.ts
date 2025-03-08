import { Injectable } from '@nestjs/common';
import { DbTelegramGroup } from '../../database/v2/entities/telegram-group.entity';
import {
  TelegramGroupByTelegramIdResponse,
  TelegramGroupResponse,
} from '@fictadvisor/utils/responses';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { TelegramGroups } from '@fictadvisor/utils';

@Injectable()
export class TelegramGroupProfile extends AutomapperProfile {
  constructor (@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile (): MappingProfile {
    return (mapper: Mapper) => {
      createMap(mapper, DbTelegramGroup, TelegramGroups);
      createMap(mapper, DbTelegramGroup, TelegramGroupResponse);
      createMap(mapper, DbTelegramGroup, TelegramGroupByTelegramIdResponse);
    };
  }
}
