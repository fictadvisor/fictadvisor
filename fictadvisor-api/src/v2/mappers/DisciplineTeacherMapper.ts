import { Injectable } from '@nestjs/common';
import { DbDisciplineTeacher } from '../database/entities/DbDisciplineTeacher';
import { Subject } from '@prisma/client';
import { DisciplineTeacherFullResponse, SubjectResponse } from '@fictadvisor/utils/responses';
import { AcademicStatus, ScientificDegree, Position, DisciplineTypeEnum } from '@fictadvisor/utils/enums';

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
      disciplineTypes: disciplineTeacher.roles.map(({ disciplineType }) => disciplineType.name),
      rating: disciplineTeacher.teacher.rating.toNumber(),
    };
  }

  getDisciplineTeachersWithTeacherParams (disciplineTeachers: DbDisciplineTeacher[]) {
    return disciplineTeachers.map(this.getDisciplineTeacherWithTeacherParams);
  }

  getRoles (disciplineTeachers: DbDisciplineTeacher[]): DisciplineTypeEnum[] {
    const disciplineTypes = new Set<DisciplineTypeEnum>();
    for (const disciplineTeacher of disciplineTeachers) {
      for (const { disciplineType } of disciplineTeacher.roles) {
        disciplineTypes.add(disciplineType.name);
      }
    }

    return Array.from(disciplineTypes);
  }

  getRolesBySubject (disciplineTeachers: DbDisciplineTeacher[], subjectId: string): DisciplineTypeEnum[] {
    const disciplineTypes = new Set<DisciplineTypeEnum>();
    for (const disciplineTeacher of disciplineTeachers) {
      if (disciplineTeacher.discipline.subjectId === subjectId) {
        for (const { disciplineType } of disciplineTeacher.roles) {
          disciplineTypes.add(disciplineType.name);
        }
      }
    }

    return Array.from(disciplineTypes);
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
        disciplineTypes: disciplineTeacher.roles.map(({ disciplineType }) => disciplineType.name),
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
