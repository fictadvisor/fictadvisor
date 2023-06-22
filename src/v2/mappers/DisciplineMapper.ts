import { Injectable } from '@nestjs/common';
import { DbDiscipline } from '../database/entities/DbDiscipline';

@Injectable()
export class DisciplineMapper {
  getDisciplinesWithTeachers (disciplines: DbDiscipline[]) {
    return disciplines.map((discipline) => ({
      id: discipline.id,
      subject: discipline.subject,
      year: discipline.year,
      semester: discipline.semester,
      isSelective: discipline.isSelective,
      teachers: discipline.disciplineTeachers.map((disciplineTeacher) => ({
        disciplineTeacherId: disciplineTeacher.id,
        ...disciplineTeacher.teacher,
        roles: disciplineTeacher.roles.map((r) => (r.role)),
      })),
    }));
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

  getDisciplineTeachers (disciplines: DbDiscipline[]) {
    const teachers = [];

    for (const discipline of disciplines) {
      for (const disciplineTeacher of discipline.disciplineTeachers) {
        teachers.push({
          disciplineTeacherId: disciplineTeacher.id,
          roles: disciplineTeacher.roles.map((r) => (r.role)),
          firstName: disciplineTeacher.teacher.firstName,
          middleName: disciplineTeacher.teacher.middleName,
          lastName: disciplineTeacher.teacher.lastName,
          avatar: disciplineTeacher.teacher.avatar,
          subject: discipline.subject,
        });
      }
    }

    return teachers;
  }

  getSortedDisciplinesByPeriod (disciplines: DbDiscipline[]) {
    const periods = [];
    disciplines.map((discipline) => {
      const period = periods.find((p) => p.semester === discipline.semester && p.year === discipline.year);
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
}
