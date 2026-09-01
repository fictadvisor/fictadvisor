import {
  CathedraWithTeachersResponse,
  CathedraResponse,
  TeacherResponse,
  CathedraWithNumberOfTeachersResponse,
} from '@fictadvisor/utils/responses';
import { DbBaseCathedra, DbCathedra } from '../../../../database/v2/entities/cathedra.entity';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, Mapper, mapWith } from '@automapper/core';
import { DbTeacher } from '../../../../database/v2/entities/teacher.entity';
import { extractField } from '../../../../common/utils/array.utils';

export class CathedraProfile extends AutomapperProfile {
  constructor (@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile () {
    return (mapper: Mapper) => {
      // Nested `cathedra` members carry only the base columns, and that is the
      // token their @AutoMap declares — register the map on it.
      createMap(mapper, DbBaseCathedra, CathedraResponse);

      createMap(mapper, DbCathedra, CathedraWithNumberOfTeachersResponse,
        forMember((response) => response.teachers,
          mapFrom((dto) => dto.teachers.length),
        ),
      );

      createMap(mapper, DbCathedra, CathedraWithTeachersResponse,
        forMember((response) => response.teachers,
          mapWith(TeacherResponse, DbTeacher, (dto) => extractField(dto.teachers, 'teacher')),
        ),
      );
    };
  }
}
