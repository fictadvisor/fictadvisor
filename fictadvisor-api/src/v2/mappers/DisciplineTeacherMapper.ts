import { Injectable } from '@nestjs/common';
import { DbDisciplineTeacher } from '../database/entities/DbDisciplineTeacher';
import { TeacherRole } from '@prisma/client';

@Injectable()
export class DisciplineTeacherMapper {
  getDisciplines (disciplineTeachers: DbDisciplineTeacher[]) {
    return disciplineTeachers.map((disciplineTeacher) => ({
      disciplineTeacherId: disciplineTeacher.id,
      subjectName: disciplineTeacher.discipline.subject.name,
    }));
  }

  getDisciplineTeacherWithTeacherParams (disciplineTeacher: DbDisciplineTeacher) {
    return {
      disciplineTeacherId: disciplineTeacher.id,
      ...disciplineTeacher.teacher,
      roles: disciplineTeacher.roles.map((r) => (r.role)),
      rating: disciplineTeacher.teacher.rating.toNumber(),
    };
  }

  getDisciplineTeachersWithTeacherParams (disciplineTeachers: DbDisciplineTeacher[]) {
    return disciplineTeachers.map(this.getDisciplineTeacherWithTeacherParams);
  }

  getRoles (disciplineTeachers: DbDisciplineTeacher[]): TeacherRole[] {
    const roles = new Set<TeacherRole>();
    for (const dt of disciplineTeachers) {
      dt.roles.forEach((r) => roles.add(r.role));
    }

    return Array.from(roles);
  }

  getRolesBySubject (disciplineTeachers: DbDisciplineTeacher[], subjectId: string): TeacherRole[] {
    const roles = new Set<TeacherRole>();
    for (const dt of disciplineTeachers) {
      if (dt.discipline.subjectId === subjectId) {
        dt.roles.forEach((r) => roles.add(r.role));
      }
    }

    return Array.from(roles);
  }

  getDisciplineTeachers (disciplineTeachers: DbDisciplineTeacher[]) {
    return disciplineTeachers.map((disciplineTeacher) => ({
      disciplineTeacherId: disciplineTeacher.id,
      roles: disciplineTeacher.roles.map((r) => r.role),
      firstName: disciplineTeacher.teacher.firstName,
      middleName: disciplineTeacher.teacher.middleName,
      lastName: disciplineTeacher.teacher.lastName,
      avatar: disciplineTeacher.teacher.avatar,
      subject: disciplineTeacher.discipline.subject,
    }));
  }
}
