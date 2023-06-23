import { Injectable } from '@nestjs/common';
import { DbTeacher } from '../database/entities/DbTeacher';
import { TeacherRole } from '@prisma/client';

@Injectable()
export class TeacherMapper {
  getTeacher (teacher: DbTeacher) {
    return {
      id: teacher.id,
      firstName: teacher.firstName,
      middleName: teacher.middleName,
      lastName: teacher.lastName,
      description: teacher.description,
      avatar: teacher.avatar,
    };
  }

  getRoles (teacher: DbTeacher): TeacherRole[] {
    const roles = [];
    for (const disciplineTeacher of teacher.disciplineTeachers) {
      const dbRoles = disciplineTeacher.roles
        .map((r) => r.role)
        .filter((r) => !roles.includes(r));
      roles.push(...dbRoles);
    }
    return roles;
  }

  getTeacherWithRoles (dbTeacher: DbTeacher) {
    const { disciplineTeachers, ...teacher } = dbTeacher;
    return {
      ...teacher,
      roles: this.getRoles(dbTeacher),
    };
  }
}
