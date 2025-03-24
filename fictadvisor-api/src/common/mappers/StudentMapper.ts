import { Injectable } from '@nestjs/common';
import { FullStudentResponse, OrdinaryStudentResponse, SimpleStudentResponse } from '@fictadvisor/utils/responses';
import { GroupRoles, State } from '@fictadvisor/utils/enums';
import { DbStudent } from '../../database/v2/entities/DbStudent';
import { DbRole } from '../../database/v2/entities/DbRole';
import { DbUserRole } from '../../database/v2/entities/DbUserRole';
import { RoleName } from '@fictadvisor/utils';

@Injectable()
export class StudentMapper {
  private getGroupRole (roles: DbUserRole[]): DbRole {
    const groupRole = roles.find((r) => r.role.name === GroupRoles.CAPTAIN || r.role.name === GroupRoles.MODERATOR || r.role.name === GroupRoles.STUDENT);
    return groupRole?.role;
  }

  getOrdinaryStudent (student: DbStudent, hasGroup = true): OrdinaryStudentResponse {
    return {
      id: student.user.id,
      username: student.user.username,
      email: student.user.email,
      firstName: student.firstName,
      lastName: student.lastName,
      middleName: student.middleName,
      avatar: student.user.avatar,
      telegramId: student.user.telegramId as unknown as number,
      group: !hasGroup ? { state: State.DECLINED, code: null, role: null, id: null } : {
        id: student.groupId,
        code: student.group?.code ?? null,
        state: student.state as State,
        role: this.getGroupRole(student.roles)?.name as RoleName ?? null,
      },
      state: student.user.state as State,
    };
  }

  getOrdinaryStudents (students: DbStudent[], hasGroup = true): OrdinaryStudentResponse[] {
    return students.map((student) => this.getOrdinaryStudent(student, hasGroup));
  }

  updateStudent (student: DbStudent): FullStudentResponse {
    return {
      id: student.userId,
      firstName: student.firstName,
      middleName: student.middleName,
      lastName: student.lastName,
      user: {
        id: student.user.id,
        email: student.user.email,
        username: student.user.username,
        telegramId: student.user.telegramId as unknown as number,
        avatar: student.user.avatar,
        state: student.user.state as State,
      },
      group: {
        id: student.group.id,
        code: student.group.code,
        educationalProgramId: student.group.educationalProgramId,
        cathedraId: student.group.cathedraId,
      },
      roles: student.roles.map((r) => ({
        studentId: r.studentId,
        roleId: r.roleId,
        role: {
          id: r.role.id,
          name: r.role.name as RoleName,
          weight: r.role.weight,
          parentId: r.role.parentId,
          displayName: r.role.displayName,
        },
      })),
      state: student.state as State,
    };
  }

  getSimpleStudents (students: DbStudent[]): SimpleStudentResponse[] {
    return students.map((student) => this.getSimpleStudent(student));
  }

  getSimpleStudent (student: DbStudent): SimpleStudentResponse {
    return {
      id: student.userId,
      lastName: student.lastName,
      firstName: student.firstName,
      middleName: student.middleName,
      state: student.state as State,
      role: this.getGroupRole(student.roles)?.name as (keyof typeof GroupRoles) ?? null,
      group: {
        id: student.groupId,
        code: student.group.code,
      },
    };
  }
}

