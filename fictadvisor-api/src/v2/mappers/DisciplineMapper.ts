import { Injectable } from '@nestjs/common';
import { DbDiscipline } from '../database/entities/DbDiscipline';
import { SelectiveAmount } from '@prisma/client';
import { ExtendDisciplineTeachersResponse } from '../api/responses/DisciplineTeachersResponse';
import { DisciplineAdminResponse } from '../api/responses/DisciplineResponse';

@Injectable()
export class DisciplineMapper {
  getDisciplinesWithTeachers (disciplines: DbDiscipline[]) {
    return disciplines.map((discipline) => this.getDisciplineWithTeachers(discipline));
  }

  getDisciplineWithTeachers (discipline: DbDiscipline): ExtendDisciplineTeachersResponse {
    return {
      id: discipline.id,
      subject: discipline.subject,
      year: discipline.year,
      semester: discipline.semester,
      isSelective: discipline.isSelective,
      teachers: discipline.disciplineTeachers.map((disciplineTeacher) => ({
        disciplineTeacherId: disciplineTeacher.id,
        ...disciplineTeacher.teacher,
        rating: disciplineTeacher.teacher.rating.toNumber(),
        roles: disciplineTeacher.roles.map((r) => r.role),
      })),
    };
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

  getSelectiveWithAmount (disciplines: DbDiscipline[], amounts: SelectiveAmount[]) {
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
}
