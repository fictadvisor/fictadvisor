import { Injectable } from '@nestjs/common';
import { DbDiscipline } from '../../../../database/v2/entities/discipline.entity';
import {
  ExtendedDisciplineTeachersResponse,
  DisciplineAdminResponse,
  SelectiveDisciplinesWithAmountResponse,
  SelectiveDisciplinesResponse,
  DisciplineResponse,
  ExtendedDisciplineResponse,
  BaseSelectiveDisciplineResponse,
  DisciplineTeacherResponse,
  SelectiveBySemestersResponse,
  ShortDisciplineResponse,
  ShortTeacherResponse,
} from '@fictadvisor/utils/responses';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, extend, forMember, mapFrom, Mapper, mapWith, mapWithArguments } from '@automapper/core';
import { DbSelectiveAmount } from '../../../../database/v2/entities/selective-amount.entity';
import { extractField } from '../../../../common/utils/array.utils';
import { DbTeacher } from '../../../../database/v2/entities/teacher.entity';
import { DbDisciplineTeacher } from '../../../../database/v2/entities/discipline-teacher.entity';

@Injectable()
export class DisciplineProfile extends AutomapperProfile {
  constructor (@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile () {
    return (mapper: Mapper) => {
      createMap(mapper, DbDiscipline, DisciplineResponse);
      createMap(mapper, DbDiscipline, ExtendedDisciplineResponse);
      createMap(mapper, DbDiscipline, ShortDisciplineResponse);

      createMap(mapper, DbDiscipline, BaseSelectiveDisciplineResponse,
        forMember(({ name }) => name,
          mapFrom(({ subject }) => subject.name)));

      createMap(mapper, DbDiscipline, DisciplineAdminResponse,
        forMember(({ name }) => name,
          mapFrom(({ subject }) => subject.name)),

        forMember((response) => response.teachers,
          mapWith(ShortTeacherResponse, DbTeacher, (dto) => extractField(dto.disciplineTeachers, 'teacher'))
        ));

      createMap(mapper, DbDiscipline, ExtendedDisciplineTeachersResponse,
        forMember((response) => response.teachers,
          mapWith(DisciplineTeacherResponse, DbDisciplineTeacher, (dto) => dto.disciplineTeachers)
        ));

      createMap(mapper, DbSelectiveAmount, SelectiveBySemestersResponse,
        forMember((response) => response.disciplines,
          mapWithArguments((dto, { disciplines }: { disciplines: DbDiscipline[]}) =>
            this.getDisciplineNames(dto, disciplines))
        ));

      createMap(mapper, DbDiscipline, SelectiveDisciplinesResponse,
        forMember((response) => response.disciplines,
          mapWithArguments((dto, { disciplines }: { disciplines: DbDiscipline[]}) => {
            const filtered = this.filterBySemester(dto as any, disciplines);
            return this.mapper.mapArray(filtered, DbDiscipline, BaseSelectiveDisciplineResponse);
          })
        ));

      createMap(mapper, DbDiscipline, SelectiveDisciplinesWithAmountResponse,
        extend(DbDiscipline, SelectiveDisciplinesResponse),
        forMember(({ amount }) => amount,
          mapFrom((dto) => this.getDisciplineAmount(dto))));
    };
  }

  private getDisciplineAmount (discipline: DbDiscipline) {
    return discipline.group.selectiveAmounts.find((amount) =>
      amount.semester === discipline.semester && amount.year === discipline.year,
    )?.amount;
  }

  private filterBySemester ({ semester, year }: DbSelectiveAmount, disciplines: DbDiscipline[]) {
    return disciplines.filter((discipline) =>
      discipline.semester === semester &&
      discipline.year === year
    );
  }

  private getDisciplineNames (semester: DbSelectiveAmount, disciplines: DbDiscipline[]) {
    const filtered = this.filterBySemester(semester, disciplines);
    return extractField(extractField(filtered, 'subject'), 'name');
  }
}

