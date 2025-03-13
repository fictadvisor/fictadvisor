import { Injectable } from '@nestjs/common';
import { FullStudentResponse, OrdinaryStudentResponse, SimpleStudentResponse } from '@fictadvisor/utils/responses';
import { GroupRoles, State } from '@fictadvisor/utils/enums';
import { DbStudent } from '../../database/v2/entities/DbStudent';
import { DbRole } from '../../database/v2/entities/DbRole';
import { DbUserRole } from '../../database/v2/entities/DbUserRole';
import { ExtendedGroupResponse } from '@fictadvisor/utils';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, Mapper, MappingProfile, mapWithArguments } from '@automapper/core';
import { DbGroup } from '../../database/v2/entities/DbGroup';

@Injectable()
export class StudentMapper extends AutomapperProfile {
  constructor (@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile (): MappingProfile {
    return (mapper: Mapper) => {
      createMap(mapper, DbStudent, SimpleStudentResponse,
        forMember((response) => response.role,
          mapFrom((dto) => this.getGroupRole(dto.roles)?.name ?? null))
      );

      createMap(mapper, DbStudent, FullStudentResponse);

      createMap(mapper, DbStudent, OrdinaryStudentResponse,
        forMember((response) => response.group.role,
          mapFrom((dto) => this.getGroupRole(dto.roles)?.name ?? null)),

        forMember((response) => response.group,
          mapWithArguments((source,
            { hasGroup = true }: { hasGroup: boolean }) =>
            this.getGroup(source, hasGroup),
          )),
      );
    };
  }

  private getGroup (student: DbStudent, hasGroup: boolean) {
    return hasGroup ?
      this.mapper.map(student.group, DbGroup, ExtendedGroupResponse) :
      { state: State.DECLINED, code: null, role: null, id: null };
  }

  private getGroupRole (roles: DbUserRole[]): DbRole {
    const groupRole = roles.find((r) => r.role.name === GroupRoles.CAPTAIN || r.role.name === GroupRoles.MODERATOR || r.role.name === GroupRoles.STUDENT);
    return groupRole?.role;
  }
}

