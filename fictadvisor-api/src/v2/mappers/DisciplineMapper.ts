import { Injectable } from '@nestjs/common';
import { DbDiscipline } from '../database/entities/DbDiscipline';
import { SelectiveAmount } from '@prisma/client';
import {
  ExtendedDisciplineTeachersResponse,
  DisciplineAdminResponse,
  SelectiveDisciplinesWithAmountResponse, SelectiveDisciplinesResponse,
} from '@fictadvisor/utils/responses';
import { AcademicStatus, ScientificDegree, Position } from '@fictadvisor/utils/enums';
import { DbDisciplineTeacher } from '../database/entities/DbDisciplineTeacher';

@Injectable()
export class DisciplineMapper {

  getDisciplinesWithTeachers (disciplines: DbDiscipline[]) {
    return disciplines.map((discipline) => this.getDisciplineWithTeachers(discipline));
  }

  getDisciplineWithTeachers (discipline: DbDiscipline): ExtendedDisciplineTeachersResponse {
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

  getDisciplineTeachers (disciplineTeachers: DbDisciplineTeacher[]) {
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
        disciplineTypes: disciplineTeacher.roles.map(({ disciplineType }) => disciplineType.name),
        cathedras: teacher.cathedras.map(({ cathedra: { id, name, abbreviation, division } }) => ({
          id,
          name,
          abbreviation,
          division,
        })),
      };
    });
  }

  getDisciplines (disciplines: DbDiscipline[]) {
    return disciplines.map((d) => ({
      id: d.id,
      subject: d.subject,
      year: d.year,
      semester: d.semester,
      isSelective: d.isSelective,
    }));
  }

  getDisciplinesForAdmin (disciplines: DbDiscipline[]): DisciplineAdminResponse[] {
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

  getSortedDisciplinesByPeriod (disciplines: DbDiscipline[]) {
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

  getSelectivesWithAmount (disciplines: DbDiscipline[], amounts: SelectiveAmount[]) {
    return amounts.map(({ year, semester, amount }) => {
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
