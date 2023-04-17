import { Injectable } from '@nestjs/common';
import { DbDisciplineTeacher } from './DbDisciplineTeacher';

@Injectable()
export class DisciplineTeacherMapper {
  getDisciplineTeachers (dbDisciplineTeachers: DbDisciplineTeacher[]) {
    return dbDisciplineTeachers.map((disciplineTeacher) => ({
      disciplineTeacherId: disciplineTeacher.id,
      subjectName: disciplineTeacher.discipline.subject.name,
    }));
  }
}
