import { Injectable } from '@nestjs/common';
import { DbDiscipline } from './DbDiscipline';

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
}
