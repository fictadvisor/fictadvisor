import {
  CathedraWithTeachersResponse,
  CathedraResponse,
  TeacherResponse,
  CathedraWithNumberOfTeachersResponse,
} from '@fictadvisor/utils/responses';
import { DbCathedra } from '../../database/v2/entities/cathedra.entity';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, Mapper, mapWith } from '@automapper/core';
import { DbTeacher } from '../../database/v2/entities/teacher.entity';
import { extractField } from '../utils/array.utils';

export class CathedraProfile extends AutomapperProfile {
  constructor (@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile () {
    return (mapper: Mapper) => {
      createMap(mapper, DbCathedra, CathedraResponse);

      createMap(mapper, DbCathedra, CathedraWithNumberOfTeachersResponse,
        forMember((response) => response.teachers,
          mapFrom((dto) => dto.teachers.length)
        ),
      );

      createMap(mapper, DbCathedra, CathedraWithTeachersResponse,
        forMember((response) => response.teachers,
          mapWith(TeacherResponse, DbTeacher, (dto) => extractField(dto.teachers, 'teacher'))
        )
      );
    };
  }
}
