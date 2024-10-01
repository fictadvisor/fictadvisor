import { Injectable } from '@nestjs/common';
import {
  GroupResponse,
  GroupsWithTelegramGroupsResponse,
  GroupWithTelegramGroupsResponse,
  MappedGroupResponse,
} from '@fictadvisor/utils/responses';
import { Group, RoleName, SelectiveAmount } from '@prisma/client';
import { DbGroup } from '../database/entities/DbGroup';
import { DbStudent } from '../database/entities/DbStudent';

@Injectable()
export class GroupMapper {
  getGroup (group: Group & { selectiveAmounts: SelectiveAmount[] }): GroupResponse {
    return {
      id: group.id,
      code: group.code,
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
        state: captain?.state,
      },
      speciality: {
        id: speciality?.id,
        code: speciality?.code,
        abbreviation: speciality?.abbreviation,
        name: speciality?.name,
      },
    };
  }

  getMappedGroups (groups: DbGroup[] | DbStudent[], byCaptain = false): MappedGroupResponse[] {
    if (byCaptain) return groups.map((captain) => this.getMappedGroup(captain.group, captain));
    return groups.map((group) => this.getMappedGroup(group));
  }

  getGroupsWithTelegramGroups (groups): GroupsWithTelegramGroupsResponse {
    return {
      groups: groups.map((group): GroupWithTelegramGroupsResponse => ({
        id: group.id,
        telegramGroups: group.telegramGroups.map((telegramGroup) => ({
          telegramId: telegramGroup.telegramId,
          threadId: telegramGroup.threadId,
          source: telegramGroup.source,
          postInfo: telegramGroup.postInfo,
        })),
      })),
    };
  }
}
