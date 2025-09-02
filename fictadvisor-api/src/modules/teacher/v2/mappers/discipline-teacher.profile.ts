import { Injectable } from '@nestjs/common';
import { DbDisciplineTeacher } from '../../../../database/v2/entities/discipline-teacher.entity';
import {
  DisciplineTeacherAndSubjectResponse,
  DisciplineTeacherExtendedResponse,
  DisciplineTeacherFullResponse,
  DisciplineTeacherResponse,
  DisciplineTypeResponse,
  CathedraResponse,
  QuestionAnswerResponse,
  SubjectResponse,
  DisciplineTeacher,
} from '@fictadvisor/utils/responses';
import { DisciplineTypeEnum } from '@fictadvisor/utils/enums';
import { DbQuestionAnswer } from '../../../../database/v2/entities/question-answer.entity';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, extend, forMember, forSelf, mapFrom, Mapper, mapWith } from '@automapper/core';
import { extractField, makeUnique } from '../../../../common/utils/array.utils';
import { DbTeacher } from '../../../../database/v2/entities/teacher.entity';
import { forMembers } from '../../../../common/utils/mapper.utils';
import { DbSubject } from '../../../../database/v2/entities/subject.entity';
import { DbDisciplineType } from '../../../../database/v2/entities/discipline-type.entity';
import { MapperOmitType } from '@automapper/classes/mapped-types';
import { DbCathedra } from '../../../../database/v2/entities/cathedra.entity';
import { TeacherProfile } from './teacher.profile';

@Injectable()
export class DisciplineTeacherProfile extends AutomapperProfile {
  constructor (@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile () {
    return (mapper: Mapper) => {
      createMap(mapper, DbDisciplineType, DisciplineTypeResponse);

      createMap(mapper, DbDisciplineTeacher, DisciplineTeacherAndSubjectResponse,
        forMember((response) => response.subjectName,
          mapFrom((dto) => dto.discipline.subject.name)
        ));

      createMap(mapper, DbDisciplineTeacher, DisciplineTeacherExtendedResponse,
        forMember((response) => response.disciplineTypes,
          mapFrom((dto) => this.getDisciplineTypes(dto))
        ));

      createMap(mapper, DbDisciplineTeacher, DisciplineTeacherResponse,
        forSelf(MapperOmitType(DbTeacher, ['rating', 'cathedras']), (dto) => dto.teacher),

        forMember((response) => response.id,
          mapFrom(({ teacher }) => teacher.id)),

        forMember((response) => response.disciplineTypes,
          mapFrom(({ roles }) => TeacherProfile.getTeacherRoles(
            [{ roles }] as DbDisciplineTeacher[],
          ))),

        forMember((response) => response.cathedras,
          mapWith(CathedraResponse, DbCathedra,
            ({ teacher }) => extractField(teacher.cathedras, 'cathedra')
          )),

        ...forMembers<DbDisciplineTeacher, DisciplineTeacherResponse>({
          disciplineTeacherId: (dto) => dto.id,
          disciplineTypes: (dto) => this.getDisciplineTypes(dto),
          rating: ({ teacher }) => teacher.rating.toNumber(),
        }));

      createMap(mapper, DbDisciplineTeacher, DisciplineTeacherFullResponse,
        extend(DbDisciplineTeacher, DisciplineTeacherResponse),
        forMember((response) => response.subject,
          mapWith(SubjectResponse, DbSubject, (dto) => dto.discipline.subject)
        ));

      createMap(mapper, DbDisciplineTeacher, DisciplineTeacher);

      createMap(mapper, DbQuestionAnswer, QuestionAnswerResponse);
    };
  }

  private getDisciplineTypes (disciplineTeacher: DbDisciplineTeacher) {
    const disciplineTypeNames = extractField(extractField(disciplineTeacher.roles, 'disciplineType'), 'name') as DisciplineTypeEnum[];
    return makeUnique(disciplineTypeNames);
  }
}
