import { Injectable } from '@nestjs/common';
import { DbDiscipline } from '../../database/v2/entities/DbDiscipline';
import { Discipline, SelectiveAmount } from '@prisma/client/fictadvisor';
import {
  ExtendedDisciplineTeachersResponse,
  DisciplineAdminResponse,
  SelectiveDisciplinesWithAmountResponse,
  SelectiveDisciplinesResponse,
  DisciplineResponse,
  DisciplineTeacherResponse,
  SelectivesBySemestersResponse,
  ExtendedDisciplineResponse,
  DisciplineTypeResponse,
  SortedDisciplinesByPeriodResponse,
} from '@fictadvisor/utils/responses';
import { AcademicStatus, ScientificDegree, Position } from '@fictadvisor/utils/enums';
import { DbDisciplineTeacher } from '../../database/v2/entities/DbDisciplineTeacher';
import { GroupMapper } from './GroupMapper';
import { SubjectMapper } from './SubjectMapper';
import { DbDisciplineType } from '../../database/v2/entities/DbDisciplineType';
import { DisciplineTypeEnum, ShortDisciplineResponse } from '@fictadvisor/utils';

@Injectable()
export class DisciplineMapper {
  constructor (
        private groupMapper: GroupMapper,
        private subjectMapper: SubjectMapper,
  ) {}

  getDiscipline (discipline: Discipline): DisciplineResponse {
    return {
      id: discipline.id,
      year: discipline.year,
      isSelective: discipline.isSelective,
      semester: discipline.semester,
      subjectId: discipline.subjectId,
      groupId: discipline.groupId,
      description: discipline.description,
    };
  }

  getExtendedDiscipline (discipline: DbDiscipline): ExtendedDisciplineResponse {
    return {
      id: discipline.id,
      year: discipline.year,
      isSelective: discipline.isSelective,
      semester: discipline.semester,
      subjectId: discipline.subjectId,
      groupId: discipline.groupId,
      description: discipline.description,
      group: this.groupMapper.getGroup(discipline.group),
      subject: this.subjectMapper.getSubject(discipline.subject),
      disciplineTypes: discipline.disciplineTypes.map(this.getDisciplineType),
    };
  }

  getDisciplineType (disciplineType: DbDisciplineType): DisciplineTypeResponse {
    return {
      id: disciplineType.id,
      disciplineId: disciplineType.disciplineId,
      name: disciplineType.name as DisciplineTypeEnum,
    };
  }

  getExtendedDisciplinesTeachers (disciplines: DbDiscipline[]): ExtendedDisciplineTeachersResponse[] {
    return disciplines.map((discipline) => this.getExtendedDisciplineTeachers(discipline));
  }

  getExtendedDisciplineTeachers (discipline: DbDiscipline): ExtendedDisciplineTeachersResponse {
    return {
      id: discipline.id,
      subject: {
        id: discipline.subject.id,
        name: discipline.subject.name,
      },
      group: {
        id: discipline.group.id,
        code: discipline.group.code,
      },
      year: discipline.year,
      semester: discipline.semester,
      isSelective: discipline.isSelective,
      teachers: this.getDisciplineTeachers(discipline.disciplineTeachers),
    };
  }

  getDisciplineTeachers (disciplineTeachers: DbDisciplineTeacher[]): DisciplineTeacherResponse[] {
    return disciplineTeachers.map((disciplineTeacher) => {
      const { teacher } = disciplineTeacher;

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
        disciplineTypes: disciplineTeacher.roles.map(({ disciplineType }) => disciplineType.name  as DisciplineTypeEnum),
        cathedras: teacher.cathedras.map(({ cathedra: { id, name, abbreviation, division } }) => ({
          id,
          name,
          abbreviation,
          division,
        })),
      };
    });
  }

  getShortDisciplines (disciplines: DbDiscipline[]): ShortDisciplineResponse[] {
    return disciplines.map((d) => ({
      id: d.id,
      subject: d.subject,
      year: d.year,
      semester: d.semester,
      isSelective: d.isSelective,
    }));
  }

  getDisciplinesAdmin (disciplines: DbDiscipline[]): DisciplineAdminResponse[] {
    return disciplines.map((d) => ({
      id: d.id,
      name: d.subject.name,
      year: d.year,
      semester: d.semester,
      isSelective: d.isSelective,
      group: {
        id: d.group.id,
        code: d.group.code,
      },
      teachers: d.disciplineTeachers.map((disciplineTeacher) => ({
        id: disciplineTeacher.teacherId,
        lastName: disciplineTeacher.teacher.lastName,
        firstName: disciplineTeacher.teacher.firstName,
        middleName: disciplineTeacher.teacher.middleName,
      })),
    }));
  }

  getSortedDisciplinesByPeriod (disciplines: DbDiscipline[]): SortedDisciplinesByPeriodResponse[] {
    const periods = [];
    disciplines.map((discipline) => {
      const period = periods.find(
        (p) => p.semester === discipline.semester && p.year === discipline.year
      );
      if (!period) {
        periods.push({
          year: discipline.year,
          semester: discipline.semester,
          disciplines: [discipline.id],
        });
      } else {
        period.disciplines.push(discipline.id);
      }
    });
    return periods;
  }

  getSelectivesBySemesters (disciplines: DbDiscipline[], amounts: SelectiveAmount[]): SelectivesBySemestersResponse {
    const selectives = amounts.map(({ year, semester, amount }) => {
      const names = [];
      disciplines.map((discipline) => {
        if (discipline.semester === semester && discipline.year === year)
          names.push(discipline.subject.name);
      });
      return {
        year,
        semester,
        amount,
        disciplines: names,
      };
    });
    return { selectives };
  }

  getSelectiveDisciplines (disciplines: DbDiscipline[], withAmount = false):
    SelectiveDisciplinesWithAmountResponse[] | SelectiveDisciplinesResponse[] {
    const result = [];
    disciplines.forEach((discipline) => {
      if (!result.some(({ semester, year }) => semester === discipline.semester && year === discipline.year)) {
        const amount = withAmount
          ? discipline.group.selectiveAmounts.find((amount) =>
            amount.semester === discipline.semester && amount.year === discipline.year
          )?.amount
          : undefined;

        result.push({
          year: discipline.year,
          semester: discipline.semester,
          amount,
          disciplines: disciplines
            .filter(({ year, semester }) => year === discipline.year && semester === discipline.semester)
            .map((d) => ({ id: d.id, name: d.subject.name })),
        });
      }
    });
    return result;
  }
}

