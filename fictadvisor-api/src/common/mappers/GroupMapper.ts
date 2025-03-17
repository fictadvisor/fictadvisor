import { Injectable } from '@nestjs/common';
import {
  GroupResponse,
  GroupsWithTelegramGroupsResponse,
  GroupWithTelegramGroupsResponse,
  MappedGroupResponse,
} from '@fictadvisor/utils/responses';
import { RoleName } from '@prisma/client/fictadvisor';
import { DbGroup } from '../../database/v2/entities/DbGroup';
import { DbStudent } from '../../database/v2/entities/DbStudent';
import { State, TelegramSource } from '@fictadvisor/utils/enums';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper } from '@automapper/core';

@Injectable()
export class GroupMapper extends AutomapperProfile {
  constructor (@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile () {
    return (mapper: Mapper) => {
      createMap(mapper, DbGroup, GroupResponse);
      createMap(mapper, DbGroup, GroupWithTelegramGroupsResponse);
    };
  }

  getMappedGroup (group: DbGroup, captain?: DbStudent): MappedGroupResponse {
    captain = captain || group.students.find(
      (student) => student.roles.find(({ role }) => role.name === RoleName.CAPTAIN)
    );
    const speciality = group?.educationalProgram?.speciality;

    return {
      id: group.id,
      code: group.code,
      admissionYear: group.admissionYear,
      educationalProgramId: group.educationalProgram?.id,
      cathedra: {
        id: group.cathedra?.id,
        name: group.cathedra?.name,
        abbreviation: group.cathedra?.abbreviation,
        division: group.cathedra?.division,
      },
      captain: {
        id: captain?.userId,
        firstName: captain?.firstName,
        middleName: captain?.middleName,
        lastName: captain?.lastName,
        state: captain?.state  as State,
      },
      speciality: {
        id: speciality?.id,
        code: speciality?.code,
        abbreviation: speciality?.abbreviation,
        name: speciality?.name,
      },
    };
  }

  getMappedGroups (groups: DbGroup[]): MappedGroupResponse[] {
    return groups.map((group) => this.getMappedGroup(group, group.students?.[0]));
  }

  getGroupsWithTelegramGroups (groups: DbGroup[]): GroupsWithTelegramGroupsResponse {
    return {
      groups: groups.map((group): GroupWithTelegramGroupsResponse => ({
        id: group.id,
        telegramGroups: group.telegramGroups.map((telegramGroup) => ({
          telegramId: telegramGroup.telegramId,
          threadId: telegramGroup.threadId,
          source: telegramGroup.source as TelegramSource,
          postInfo: telegramGroup.postInfo,
        })),
      })),
    };
  }
}
