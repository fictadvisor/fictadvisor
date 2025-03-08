import { Injectable } from '@nestjs/common';
import {
  EventResponse,
  GeneralShortEventResponse,
  TelegramShortEventResponse,
  ShortEventResponse,
} from '@fictadvisor/utils/responses';
import { EventTypeEnum } from '@fictadvisor/utils/enums';
import { some } from '../utils/array.utils';
import { DbEvent } from '../../database/v2/entities/event.entity';
import { DbDiscipline } from '../../database/v2/entities/discipline.entity';
import { DbDisciplineType } from '../../database/v2/entities/discipline-type.entity';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, extend, forMember, mapFrom, Mapper, mapWithArguments } from '@automapper/core';
import { DbDisciplineTeacher } from '../../database/v2/entities/discipline-teacher.entity';
import { DbTeacher } from '../../database/v2/entities/teacher.entity';
import { ShortTeacherResponse } from '@fictadvisor/utils';

@Injectable()
export class ScheduleProfile extends AutomapperProfile {
  constructor (@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile () {
    return (mapper: Mapper) => {
      createMap(mapper, DbEvent, GeneralShortEventResponse,
        forMember((response) => response.eventType,
          mapFrom(({ lessons }) => this.getEventType(lessons[0].disciplineType))));

      createMap(mapper, DbEvent, ShortEventResponse,
        extend(DbEvent, GeneralShortEventResponse));

      createMap(mapper, DbEvent, TelegramShortEventResponse,
        extend(DbEvent, GeneralShortEventResponse),
        forMember((response) => response.eventInfo,
          mapFrom(({ eventInfo }) => eventInfo[0]?.description ?? null)));

      createMap(mapper, DbEvent, EventResponse,
        extend(DbEvent, TelegramShortEventResponse),

        forMember((response) => response.disciplineInfo,
          mapWithArguments((_, { discipline }: { discipline: DbDiscipline }) => discipline?.description ?? null)),

        forMember((response) => response.disciplineId,
          mapWithArguments((_, { discipline }: { discipline: DbDiscipline }) => discipline?.id ?? null)),

        forMember((response) => response.teachers,
          mapWithArguments(({ lessons }, { discipline }: { discipline: DbDiscipline }) =>
            this.getTeachers(discipline?.disciplineTeachers, lessons[0]?.disciplineType))
        ));
    };
  }


  private getTeachers (disciplineTeachers: DbDisciplineTeacher[], disciplineType: DbDisciplineType) {
    if (!disciplineTeachers) return null;

    const eventType = this.getEventType(disciplineType);
    const filteredDisciplineTeachers = disciplineTeachers
      .filter(({ roles }) => {
        const teacherDisciplineTypes = roles.map(({ disciplineType }) => disciplineType);
        return some(teacherDisciplineTypes as DbDisciplineType[], 'name', eventType);
      });

    const teachers = filteredDisciplineTeachers.map(({ teacher }) => teacher);
    return this.mapper.mapArray(teachers, DbTeacher, ShortTeacherResponse);
  }

  private getEventType (disciplineType: DbDisciplineType) {
    return disciplineType?.name as unknown as EventTypeEnum ?? EventTypeEnum.OTHER;
  }
}
