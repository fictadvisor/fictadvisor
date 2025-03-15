import { EduProgramResponse } from '@fictadvisor/utils/responses';
import { DbEducationalProgram } from '../../database/v2/entities/DbEducationalProgram';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';

export class EduProgramMapper extends AutomapperProfile {
  constructor (@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile () {
    return (mapper: Mapper) => {
      createMap(mapper, DbEducationalProgram, EduProgramResponse,
        forMember((response) => response.groupsAmount,
          mapFrom((dto) => dto.groups?.length))
      );
    };
  }
}
