import { Injectable } from '@nestjs/common';
import { Sort, SortDTO } from '@fictadvisor/utils/requests';
import {
  OrderQAParam,
  SortQATParam,
  AcademicStatus,
  ScientificDegree,
  Position,
  DisciplineTypeEnum,
} from '@fictadvisor/utils/enums';
import { DbTeacher } from '../database/entities/DbTeacher';
import { DbDisciplineTeacherRole } from '../database/entities/DbDisciplineTeacherRole';

@Injectable()
export class TeacherMapper {
  getTeacher (teacher: DbTeacher) {
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
      cathedras: this.getCathedras(teacher),
      disciplineTypes: this.getRoles(teacher),
    };
  }

  getTeachers (teachers: DbTeacher[]) {
    return teachers.map((teacher) => this.getTeacher(teacher));
  }

  getRoles (teacher: DbTeacher): DisciplineTypeEnum[] {
    const disciplineTypes: DisciplineTypeEnum[] = [];
    for (const disciplineTeacher of teacher.disciplineTeachers) {
      disciplineTypes.push(...disciplineTeacher.roles.map((role: DbDisciplineTeacherRole) => role.disciplineType.name));
    }

    return [...new Set(disciplineTypes)];
  }

  private getCathedras (teacher: DbTeacher) {
    return teacher.cathedras?.map(({ cathedra: { id, name, abbreviation, division } }) => ({
      id,
      name,
      abbreviation,
      division,
    }));
  }

  getSortedTeacher ({ sort, order }: SortDTO): Sort | object {
    if (!sort) sort = SortQATParam.LAST_NAME;
    if (!order) order = OrderQAParam.ASC;
    const orderBy = [{ [sort]: order }];

    orderBy.push({ [SortQATParam.LAST_NAME]: order });
    orderBy.push({ [SortQATParam.FIRST_NAME]: order });
    orderBy.push({ [SortQATParam.MIDDLE_NAME]: order });

    return { orderBy };
  }
}
