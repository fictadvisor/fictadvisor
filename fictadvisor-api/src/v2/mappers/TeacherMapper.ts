import { Injectable } from '@nestjs/common';
import { Sort, SortDTO } from '@fictadvisor/utils/requests';
import {
  TeacherRole,
  OrderQAParam,
  SortQATParam,
  AcademicStatus,
  ScientificDegree,
  Position,
} from '@fictadvisor/utils/enums';
import { DbTeacher } from '../database/entities/DbTeacher';
import { getTeacherRoles } from './TeacherRoleAdapter';
import { TeacherResponse, TeacherWithRolesAndCathedrasResponse } from '@fictadvisor/utils';
import { Teacher } from '@prisma/client';

@Injectable()
export class TeacherMapper {
  getTeacher (teacher: Teacher): TeacherResponse {
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
    };
  }

  getTeacherWithRolesAndCathedras (teacher: DbTeacher): TeacherWithRolesAndCathedrasResponse {
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
      roles: this.getTeacherRoles(teacher),
    };
  }

  getTeachersWithRolesAndCathedras (teachers: DbTeacher[]): TeacherWithRolesAndCathedrasResponse[] {
    return teachers.map((teacher) => this.getTeacherWithRolesAndCathedras(teacher));
  }

  getTeacherRoles (teacher: DbTeacher): TeacherRole[] {
    const roles: TeacherRole[] = [];
    for (const disciplineTeacher of teacher.disciplineTeachers) {
      roles.push(...getTeacherRoles(disciplineTeacher.roles));
    }

    return [...new Set(roles)];
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
