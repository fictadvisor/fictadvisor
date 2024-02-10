import { Injectable } from '@nestjs/common';
import { DbDisciplineTeacher } from '../database/entities/DbDisciplineTeacher';
import { Subject } from '@prisma/client';
import { DisciplineTeacherFullResponse, SubjectResponse } from '@fictadvisor/utils/responses';
import { TeacherRole, AcademicStatus, ScientificDegree, Position } from '@fictadvisor/utils/enums';
import { getTeacherRoles, TeacherRoleAdapter } from './TeacherRoleAdapter';

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
      roles: getTeacherRoles(disciplineTeacher.roles),
      rating: disciplineTeacher.teacher.rating.toNumber(),
    };
  }

  getDisciplineTeachersWithTeacherParams (disciplineTeachers: DbDisciplineTeacher[]) {
    return disciplineTeachers.map(this.getDisciplineTeacherWithTeacherParams);
  }

  getRoles (disciplineTeachers: DbDisciplineTeacher[]): TeacherRole[] {
    const roles = new Set<TeacherRole>();
    for (const disciplineTeacher of disciplineTeachers) {
      for (const { disciplineType } of disciplineTeacher.roles) {
        roles.add(TeacherRoleAdapter[disciplineType.name]);
      }
    }

    return Array.from(roles);
  }

  getRolesBySubject (disciplineTeachers: DbDisciplineTeacher[], subjectId: string): TeacherRole[] {
    const roles = new Set<TeacherRole>();
    for (const disciplineTeacher of disciplineTeachers) {
      if (disciplineTeacher.discipline.subjectId === subjectId) {
        for (const { disciplineType } of disciplineTeacher.roles) {
          roles.add(TeacherRoleAdapter[disciplineType.name]);
        }
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
        academicStatus: teacher.academicStatus as AcademicStatus,
        scientificDegree: teacher.scientificDegree as ScientificDegree,
        position: teacher.position as Position,
        rating: +teacher.rating,
        disciplineTeacherId: disciplineTeacher.id,
        roles: getTeacherRoles(disciplineTeacher.roles),
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
