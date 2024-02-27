import { Injectable } from '@nestjs/common';
import { DbDisciplineTeacher } from '../database/entities/DbDisciplineTeacher';
import { Subject, TeacherRole } from '@prisma/client';
import { DisciplineTeacherFullResponse } from '../api/responses/DisciplineTeacherResponse';
import { SubjectResponse } from '../api/responses/SubjectResponse';
import { TeacherRoleAdapter } from './TeacherRoleAdapter';

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
      roles: this.getRoles(disciplineTeacher),
      rating: disciplineTeacher.teacher.rating.toNumber(),
    };
  }

  getDisciplineTeachersWithTeacherParams (disciplineTeachers: DbDisciplineTeacher[]) {
    return disciplineTeachers.map(this.getDisciplineTeacherWithTeacherParams);
  }

  getRolesBySubject (disciplineTeachers: DbDisciplineTeacher[], subjectId: string): TeacherRole[] {
    const roles = new Set<TeacherRole>();
    for (const { discipline } of disciplineTeachers) {
      if (discipline.subjectId === subjectId) {
        discipline.disciplineTypes.forEach(({ name }) => roles.add(TeacherRoleAdapter[name]));
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
        roles: this.getRoles(disciplineTeacher),
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

  getDisciplineTeacherWithRoles (disciplineTeacher: DbDisciplineTeacher) {
    return {
      ...disciplineTeacher,
      roles: this.getRoles(disciplineTeacher),
    };
  }

  getDisciplineTeachersWithRoles (disciplineTeachers: DbDisciplineTeacher[]) {
    return disciplineTeachers.map(this.getDisciplineTeacherWithRoles);
  }

  getSubject (subject: Subject): SubjectResponse {
    return {
      id: subject.id,
      name: subject.name,
    };
  }

  getRoles ({ discipline: { disciplineTypes } }: DbDisciplineTeacher): TeacherRole[] {
    const roles = new Set<TeacherRole>();

    for (const { name } of disciplineTypes) {
      roles.add(TeacherRoleAdapter[name]);
    }

    return Array.from(roles);
  }
}
