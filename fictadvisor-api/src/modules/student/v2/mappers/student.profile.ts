import { Injectable } from '@nestjs/common';
import {
  BaseStudentResponse,
  FullStudentResponse,
  OrdinaryStudentResponse,
  SimpleStudentResponse,
} from '@fictadvisor/utils/responses';
import { GroupRoles, State } from '@fictadvisor/utils/enums';
import { DbStudent } from '../../../../database/v2/entities/student.entity';
import { DbUserRole } from '../../../../database/v2/entities/user-role.entity';
import { ExtendedGroupResponse, RoleName } from '@fictadvisor/utils';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, forSelf, mapFrom, Mapper, mapWithArguments } from '@automapper/core';
import { DbUser } from '../../../../database/v2/entities/user.entity';

@Injectable()
export class StudentProfile extends AutomapperProfile {
  constructor (@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile () {
    return (mapper: Mapper) => {
      createMap(mapper, DbStudent, BaseStudentResponse);

      createMap(mapper, DbStudent, OrdinaryStudentResponse,
        forSelf(DbUser, (dto) => dto.user),
        forMember((response) => response.group,
          mapWithArguments((dto, { hasGroup = true }: { hasGroup: boolean }) => this.getGroup(dto, hasGroup)),
        ));

      createMap(mapper, DbStudent, SimpleStudentResponse,
        forSelf(DbUser, (dto) => dto.user),
        forMember((response) => response.role,
          mapFrom(({ roles }) => this.getGroupRole(roles) as keyof typeof GroupRoles),
        ));

      createMap(mapper, DbStudent, FullStudentResponse,
        forSelf(DbUser, (dto) => dto.user));
    };
  }

  private getGroupRole (roles: DbUserRole[]): RoleName {
    const groupRole = roles.find(({ role }) => role.name in GroupRoles);
    return groupRole?.role?.name as RoleName;
  }

  private getGroup (student: DbStudent, hasGroup: boolean): ExtendedGroupResponse {
    return !hasGroup ? { state: State.DECLINED, code: null, role: null, id: null } : {
      id: student.group.id,
      code: student.group?.code ?? null,
      state: student.state as State,
      role: this.getGroupRole(student.roles) ?? null,
    };
  }
}

