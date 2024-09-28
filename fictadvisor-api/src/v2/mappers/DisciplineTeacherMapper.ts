import { Injectable } from '@nestjs/common';
import { DbDisciplineTeacher } from '../database/entities/DbDisciplineTeacher';
import {
  DisciplineTeacherAndSubjectResponse,
  DisciplineTeacherExtendedResponse,
  DisciplineTeacherFullResponse,
} from '@fictadvisor/utils/responses';
import { TeacherRole, AcademicStatus, ScientificDegree, Position } from '@fictadvisor/utils/enums';
import { getTeacherRoles, TeacherRoleAdapter } from './TeacherRoleAdapter';
import { QuestionAnswerResponse } from '@fictadvisor/utils';
import { DbQuestionAnswer } from '../database/entities/DbQuestionAnswer';
import { QuestionMapper } from './QuestionMapper';
import { TeacherMapper } from './TeacherMapper';
import { DisciplineMapper } from './DisciplineMapper';
import { SubjectMapper } from './SubjectMapper';
import { DbDisciplineTeacherRole } from '../database/entities/DbDisciplineTeacherRole';

@Injectable()
export class DisciplineTeacherMapper {
  constructor (
      private questionMapper: QuestionMapper,
      private teacherMapper: TeacherMapper,
      private disciplineMapper: DisciplineMapper,
      private subjectMapper: SubjectMapper,
  ) {}

  getDisciplinesTeacherAndSubject (disciplineTeachers: DbDisciplineTeacher[]): DisciplineTeacherAndSubjectResponse[] {
    return disciplineTeachers.map((disciplineTeacher) => ({
      disciplineTeacherId: disciplineTeacher.id,
      subjectName: disciplineTeacher.discipline.subject.name,
    }));
  }

  private getDisciplineTeacherWithTeacherParams (disciplineTeacher: DbDisciplineTeacher) {
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

  getDisciplineTeachersFull (disciplineTeachers: DbDisciplineTeacher[]): DisciplineTeacherFullResponse[] {
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
        subject: this.subjectMapper.getSubject(subject),
        cathedras: teacher.cathedras.map(({ cathedra: { id, name, abbreviation, division } }) => ({
          id,
          name,
          abbreviation,
          division,
        })),
      };
    });
  }

  getQuestionAnswer (answer: DbQuestionAnswer): QuestionAnswerResponse {
    return {
      disciplineTeacherId: answer.disciplineTeacherId,
      questionId: answer.questionId,
      userId: answer.userId,
      value: answer.value,
      disciplineTeacher: {
        id: answer.disciplineTeacher.id,
        teacherId: answer.disciplineTeacher.teacherId,
        disciplineId: answer.disciplineTeacher.disciplineId,
        discipline: this.disciplineMapper.getDiscipline(answer.disciplineTeacher.discipline),
        teacher: this.teacherMapper.getTeacher(answer.disciplineTeacher.teacher),
      },
      question: this.questionMapper.getQuestionWithCategory(answer.question) as any,
    };
  }

  getDisciplineTeacherExtended (disciplineTeacher: DbDisciplineTeacher): DisciplineTeacherExtendedResponse {
    return {
      id: disciplineTeacher.id,
      teacherId: disciplineTeacher.teacherId,
      disciplineId: disciplineTeacher.disciplineId,
      discipline: this.disciplineMapper.getExtendedDiscipline(disciplineTeacher.discipline),
      teacher: this.teacherMapper.getTeacher(disciplineTeacher.teacher),
      roles: disciplineTeacher.roles.map((role: DbDisciplineTeacherRole) => TeacherRoleAdapter[role.disciplineType.name]),
    };
  }
}
