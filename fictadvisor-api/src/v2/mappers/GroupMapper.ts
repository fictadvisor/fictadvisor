import { Injectable } from '@nestjs/common';
import { MappedGroupResponse } from '@fictadvisor/utils/responses';
import { RoleName } from '@prisma/client';
import { DbGroup } from '../database/entities/DbGroup';
import { DbStudent } from '../database/entities/DbStudent';

@Injectable()
export class GroupMapper {
  getGroup (group: DbGroup): MappedGroupResponse {
    const captain = group.students.find(
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

  getGroupByCaptain (captain: DbStudent): MappedGroupResponse {
    const group = captain.group;
    const speciality = group.educationalProgram?.speciality;

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
        id: captain.userId,
        firstName: captain.firstName,
        middleName: captain.middleName,
        lastName: captain.lastName,
        state: captain.state,
      },
      speciality: {
        id: speciality?.id,
        code: speciality?.code,
        abbreviation: speciality?.abbreviation,
        name: speciality?.name,
      },
    };
  }
  
  getGroups (groups: DbGroup[] | DbStudent[], byCaptain=false) {
    if (byCaptain) return groups.map((captain) =>  this.getGroupByCaptain(captain));
    return groups.map((group) =>  this.getGroup(group));
  }
  
  getGroupsByCaptain (captains: DbStudent[]) {
    return captains.map((captain) =>  this.getGroupByCaptain(captain));
  }

  getGroupsWithTelegramGroups (groups) {
    return {
      groups: groups.map((group) => ({
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