import { Injectable } from '@nestjs/common';
import { Role, Superhero } from '@prisma/client';
import { DbStudent } from '../database/entities/DbStudent';

@Injectable()
export class StudentMapper {
  private getGroupRole (roles: { role: Role }[]) {
    const groupRole = roles.find((r) => r.role.name === 'CAPTAIN' || r.role.name === 'MODERATOR' || r.role.name === 'STUDENT');
    return groupRole?.role;
  }

  getStudent (student: DbStudent, hasGroup = true) {
    return {
      id: student.user.id,
      username: student.user.username,
      email: student.user.email,
      firstName: student.firstName,
      lastName: student.lastName,
      middleName: student.middleName,
      avatar: student.user.avatar,
      telegramId: student.user.telegramId,
      group: !hasGroup ? undefined : {
        id: student.groupId,
        code: student.group.code,
        state: student.state,
        role: this.getGroupRole(student.roles)?.name,
      },
      state: student.user.state,
    };
  }

  updateStudent (student: DbStudent) {
    return {
      firstName: student.firstName,
      middleName: student.middleName,
      lastName: student.lastName,
      user: {
        id: student.user.id,
        email: student.user.email,
        username: student.user.username,
        telegramId: student.user.telegramId,
        avatar: student.user.avatar,
        state: student.user.state,
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
          name: r.role.name,
          weight: r.role.weight,
          parentId: r.role.parentId,
          displayName: r.role.displayName,
        },
      })),
      state: student.state,
    };
  }

  getSuperhero (superhero: Superhero) {
    return {
      userId: superhero.userId,
      dorm: superhero.dorm,
      state: superhero.state,
    };
  }

  getStudents (students: DbStudent[]) {
    return students.map((s) => ({
      id: s.userId,
      lastName: s.lastName,
      firstName: s.firstName,
      middleName: s.middleName,
      state: s.state,
      group: {
        id: s.groupId,
        code: s.group.code,
        role: this.getGroupRole(s.roles)?.name ?? null,
      },
    }));
  }

  getSimpleStudent (s: DbStudent) {
    return {
      id: s.userId,
      lastName: s.lastName,
      firstName: s.firstName,
      middleName: s.middleName,
      state: s.state,
      group: {
        id: s.groupId,
        code: s.group.code,
        role: this.getGroupRole(s.roles)?.name ?? null,
      },
    };
  }
}