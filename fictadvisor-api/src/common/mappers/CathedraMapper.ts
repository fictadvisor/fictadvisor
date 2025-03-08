import {
  CathedraWithTeachersResponse,
  CathedraResponse,
  CathedraWithNumberOfTeachersResponse, TeacherResponse,
} from '@fictadvisor/utils/responses';
import { DbCathedra } from '../../database/v2/entities/DbCathedra';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { DbTeacher } from '../../database/v2/entities/DbTeacher';
import { extractField } from '../helpers/arrayUtils';

export class CathedraMapper extends AutomapperProfile {
  constructor (@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile () {
    return (mapper: Mapper) => {
      createMap(mapper, DbCathedra, CathedraResponse);
      createMap(mapper, DbCathedra, CathedraWithTeachersResponse,
        forMember((response) => response.teachers,
          mapFrom((dto) =>
            this.mapper.mapArray(extractField(dto.teachers, 'teacher'), DbTeacher, TeacherResponse))
        )
      );
    };
  }


  getCathedra (cathedra: DbCathedra): CathedraResponse {
    return this.mapper.map(cathedra, DbCathedra, CathedraResponse);
  }

  getCathedraWithTeachers (cathedra: DbCathedra): CathedraWithTeachersResponse {
    return this.mapper.map(cathedra, DbCathedra, CathedraWithTeachersResponse);
  }

  getCathedraWithNumberOfTeachers (cathedras: DbCathedra[]): CathedraWithNumberOfTeachersResponse[] {
    return cathedras.map((cathedra) => ({
      ...this.getCathedra(cathedra),
      teachers: cathedra.teachers.length,
    }));
  }
}
