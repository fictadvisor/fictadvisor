import { Injectable } from '@nestjs/common';
import { DbDisciplineTeacher } from '../database/entities/DbDisciplineTeacher';
import { Subject, TeacherRole } from '@prisma/client';
import { DisciplineTeacherFullResponse } from '../api/responses/DisciplineTeacherResponse';
import { SubjectResponse } from '../api/responses/SubjectResponse';

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

  getDisciplineTeachers (disciplineTeachers: DbDisciplineTeacher[]): DisciplineTeacherFullResponse[] {
    return disciplineTeachers.map((disciplineTeacher) => {
      const { teacher, discipline: { subject } } = disciplineTeacher;

      return {
        id: teacher.id,
        firstName: teacher.firstName,
        middleName: teacher.middleName,
        lastName: teacher.lastName,
        description: teacher.description,
        avatar: teacher.avatar,
        rating: +teacher.rating,
        disciplineTeacherId: disciplineTeacher.id,
        roles: disciplineTeacher.roles.map((r) => r.role),
        subject: this.getSubject(subject),
        cathedras: teacher.cathedras.map(({ cathedra: { id, name, abbreviation, division } }) => ({
          id,
          name,
          abbreviation,
          division,
        })),
      };
    });
  }

  getSubject (subject: Subject): SubjectResponse {
    return {
      id: subject.id,
      name: subject.name,
    };
  }
}
