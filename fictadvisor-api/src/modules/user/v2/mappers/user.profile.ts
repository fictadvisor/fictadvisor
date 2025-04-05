import { Injectable } from '@nestjs/common';
import {
  ShortUserResponse,
  UserForGetAllResponse,
  UserResponse,
} from '@fictadvisor/utils/responses';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { DbUser } from '../../../../database/v2/entities/user.entity';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor (@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile (): MappingProfile {
    return (mapper: Mapper) => {
      createMap(mapper, DbUser, ShortUserResponse);
      createMap(mapper, DbUser, UserForGetAllResponse);
      createMap(mapper, DbUser, UserResponse);
    };
  }
}
