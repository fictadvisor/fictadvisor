import { Injectable } from '@nestjs/common';
import { DbTeacher } from '../database/entities/DbTeacher';
import { TeacherRole } from '@prisma/client';
import { OrderQAParam } from '../api/dtos/OrderQAParam';
import { Sort, SortDTO } from '../utils/QueryAllDTO';
import { SortQATParam } from '../api/dtos/SortQATParam';

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
      rating: teacher.rating.toNumber(),
      cathedra: this.getTeacherCathedras(teacher),
      roles: this.getRoles(teacher),
    };
  }

  getTeachers (teachers: DbTeacher[]) {
    return teachers.map((teacher) => this.getTeacher(teacher));
  }

  getRoles (teacher: DbTeacher): Set<TeacherRole> {
    const roles: TeacherRole[] = [];
    for (const dt of teacher.disciplineTeachers) {
      roles.push(...dt.roles.map((r) => r.role));
    }
    return new Set(roles);
  }

  private getTeacherCathedras (teacher: DbTeacher) : string[] {
    return teacher.cathedras?.map((cathedra) => cathedra.cathedra.abbreviation);
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

  getTeacherWithRoles (dbTeacher: DbTeacher) {
    const { disciplineTeachers, ...teacher } = dbTeacher;
    return {
      ...teacher,
      roles: this.getRoles(dbTeacher),
    };
  }
}
