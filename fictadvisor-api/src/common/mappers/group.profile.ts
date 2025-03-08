import { Injectable } from '@nestjs/common';
import {
  GroupResponse,
  BaseStudentResponse,
  GroupWithTelegramGroupsResponse,
  MappedGroupResponse, SpecialityResponse, FullGroupResponse,
} from '@fictadvisor/utils/responses';
import { RoleName } from '@prisma/client/fictadvisor';
import { DbGroup } from '../../database/v2/entities/group.entity';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, Mapper, mapWith, nullSubstitution } from '@automapper/core';
import { DbStudent } from '../../database/v2/entities/student.entity';
import { DbSpeciality } from '../../database/v2/entities/speciality.entity';

@Injectable()
export class GroupProfile extends AutomapperProfile {
  constructor (@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile () {
    return (mapper: Mapper) => {
      createMap(mapper, DbGroup, GroupResponse);
      createMap(mapper, DbGroup, FullGroupResponse);

      createMap(mapper, DbGroup, GroupWithTelegramGroupsResponse);

      createMap(mapper, DbGroup, MappedGroupResponse,
        forMember((response) => response.captain,
          mapWith(BaseStudentResponse, DbStudent, (dto) => this.findCaptain(dto.students) ?? {})),

        forMember((response) => response.speciality,
          mapWith(SpecialityResponse, DbSpeciality, (dto) => dto.educationalProgram?.speciality ?? {})),

        forMember((response) => response.cathedra,
          nullSubstitution({}))
      );
    };
  }

  private findCaptain (students: DbStudent[]) {
    return students.find(
      (student) => student.roles.some(
        ({ role }) => role.name === RoleName.CAPTAIN
      ));
  }
}
