import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, extend, forMember, mapFrom, Mapper, MappingProfile, mapWith } from '@automapper/core';
import {
  CathedraResponse,
  TeacherResponse,
  TeacherWithRolesAndCathedrasResponse,
  ShortTeacherResponse,
} from '@fictadvisor/utils/responses';
import { DisciplineTypeEnum } from '@fictadvisor/utils/enums';
import { DbTeacher } from '../../../../database/v2/entities/teacher.entity';
import { DbCathedra } from '../../../../database/v2/entities/cathedra.entity';
import { extractField, makeUnique } from '../../../../common/utils/array.utils';
import { DbDisciplineTeacher } from '../../../../database/v2/entities/discipline-teacher.entity';
import { MapperOmitType } from '@automapper/classes/mapped-types';

@Injectable()
export class TeacherProfile extends AutomapperProfile {
  constructor (@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile (): MappingProfile {
    return (mapper: Mapper) => {
      createMap(mapper, DbTeacher, ShortTeacherResponse);
      createMap(mapper, MapperOmitType(DbTeacher, ['rating']), MapperOmitType(TeacherResponse, ['rating']));

      createMap(mapper, DbTeacher, TeacherResponse,
        forMember((response) => response.rating,
          mapFrom((dto) => dto.rating.toNumber())
        ));

      createMap(mapper, DbTeacher, TeacherWithRolesAndCathedrasResponse,
        extend(DbTeacher, TeacherResponse),

        forMember((response) => response.cathedras,
          mapWith(CathedraResponse, DbCathedra, (dto) => extractField(dto.cathedras, 'cathedra'))
        ),
        forMember((response) => response.disciplineTypes,
          mapFrom((dto) => TeacherProfile.getTeacherRoles(dto.disciplineTeachers)))
      );
    };
  }

  static getTeacherRoles (disciplineTeachers: DbDisciplineTeacher[]): DisciplineTypeEnum[] {
    const disciplineTypes: DisciplineTypeEnum[] = [];
    for (const { roles } of disciplineTeachers) {
      disciplineTypes.push(
        ...extractField(extractField(roles, 'disciplineType'), 'name') as DisciplineTypeEnum[]);
    }

    return makeUnique(disciplineTypes);
  }
}
