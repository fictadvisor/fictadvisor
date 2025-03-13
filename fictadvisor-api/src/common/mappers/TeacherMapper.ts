import { Injectable } from '@nestjs/common';
import {
  DisciplineTypeEnum,
} from '@fictadvisor/utils/enums';
import { DbTeacher } from '../../database/v2/entities/DbTeacher';
import { CathedraResponse, TeacherResponse, TeacherWithRolesAndCathedrasResponse } from '@fictadvisor/utils/responses';
import { DbDisciplineTeacherRole } from '../../database/v2/entities/DbDisciplineTeacherRole';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { DbCathedra } from '../../database/v2/entities/DbCathedra';
import { extractField } from '../helpers/arrayUtils';

@Injectable()
export class TeacherMapper extends AutomapperProfile {
  constructor (@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile () {
    return (mapper: Mapper) => {
      createMap(mapper, DbTeacher, TeacherResponse);

      createMap(mapper, DbTeacher, TeacherWithRolesAndCathedrasResponse,
        forMember(
          (response) => response.disciplineTypes,
          mapFrom((dto) => this.getTeacherRoles(dto))
        ),
        forMember(
          (response) => response.cathedras,
          mapFrom((dto) => this.mapper.mapArray(
            extractField(dto.cathedras, 'cathedra'), DbCathedra, CathedraResponse)
          )
        ),
      );
    };
  }

  getTeacher (teacher: DbTeacher): TeacherResponse {
    return this.mapper.map(teacher, DbTeacher, TeacherResponse);
  }

  getTeacherWithRolesAndCathedras (teacher: DbTeacher): TeacherWithRolesAndCathedrasResponse {
    return this.mapper.map(teacher, DbTeacher, TeacherWithRolesAndCathedrasResponse);
  }

  getTeachersWithRolesAndCathedras (teachers: DbTeacher[]): TeacherWithRolesAndCathedrasResponse[] {
    return this.mapper.mapArray(teachers, DbTeacher, TeacherWithRolesAndCathedrasResponse);
  }

  getTeacherRoles (teacher: DbTeacher): DisciplineTypeEnum[] {
    const disciplineTypes: DisciplineTypeEnum[] = [];

    if (teacher.disciplineTeachers) {
      for (const disciplineTeacher of teacher.disciplineTeachers) {
        disciplineTypes.push(...disciplineTeacher.roles.map((role: DbDisciplineTeacherRole) => role.disciplineType.name as DisciplineTypeEnum));
      }
    }

    return [...new Set(disciplineTypes)];
  }
}
