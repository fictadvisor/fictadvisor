import { Injectable } from '@nestjs/common';
import { DbTeacher } from '../database/entities/DbTeacher';
import { TeacherRole } from '@prisma/client';
import { OrderQAParam } from '../api/dtos/OrderQAParam';
import { Sort } from '../utils/QueryAllDTO';
import { SortQATParam } from '../api/dtos/SortQATParam';
import { SortDTO } from '../utils/QueryAllDTO';

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
    };
  }

  getRoles (teacher: DbTeacher): TeacherRole[] {
    const roles = [];
    for (const disciplineTeacher of teacher.disciplineTeachers) {
      const dbRoles = disciplineTeacher.roles
        .map((r) => r.role)
        .filter((r) => !roles.includes(r));
      roles.push(...dbRoles);
    }
    return roles;
  }

  getSortedTeacher ({ sort = SortQATParam.LAST_NAME, order = OrderQAParam.ASC }: SortDTO): Sort | object {
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
