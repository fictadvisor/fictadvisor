import { Injectable } from '@nestjs/common';
import { Parser } from './Parser';
import axios from 'axios';
import { DisciplineTypeEnum, Period, TeacherRole } from '@prisma/client';
import { DisciplineTeacherRepository } from '../../database/repositories/DisciplineTeacherRepository';
import { DisciplineTeacherRoleRepository } from '../../database/repositories/DisciplineTeacherRoleRepository';
import { GroupRepository } from '../../database/repositories/GroupRepository';
import { DisciplineRepository } from '../../database/repositories/DisciplineRepository';
import { SubjectRepository } from '../../database/repositories/SubjectRepository';
import { TeacherRepository } from '../../database/repositories/TeacherRepository';
import { ScheduleDayType, ScheduleGroupType, SchedulePairType, ScheduleType } from './ScheduleParserTypes';
import { EventRepository } from '../../database/repositories/EventRepository';
import { DateService, DAY, HOUR, MINUTE, StudyingSemester, WEEK } from '../date/DateService';

export const DAY_NUMBER = {
  'Пн': 1,
  'Вв': 2,
  'Ср': 3,
  'Чт': 4,
  'Пт': 5,
  'Сб': 6,
  'Нд': 7,
};

export const DISCIPLINE_TYPE = {
  'lec': DisciplineTypeEnum.LECTURE,
  'prac': DisciplineTypeEnum.PRACTICE,
  'lab': DisciplineTypeEnum.LABORATORY,
};

export const TEACHER_TYPE = {
  'lec': TeacherRole.LECTURER,
  'prac': TeacherRole.PRACTICIAN,
  'lab': TeacherRole.LABORANT,
};

@Injectable()
export class ScheduleParser implements Parser {
  constructor (
    private groupRepository: GroupRepository,
    private teacherRepository: TeacherRepository,
    private subjectRepository: SubjectRepository,
    private disciplineRepository: DisciplineRepository,
    private disciplineTeacherRepository: DisciplineTeacherRepository,
    private disciplineTeacherRoleRepository: DisciplineTeacherRoleRepository,
    private eventRepository: EventRepository,
    private dateService: DateService,
  ) {}

  async parse (period: StudyingSemester, groupList: string[]) {
    const groups: ScheduleGroupType[] = (await axios.get('https://schedule.kpi.ua/api/schedule/groups')).data.data;
    let filtered = groups
      .filter((group) => group.faculty === 'ФІОТ')
      .map((group) => ({
        id: group.id,
        name: group.name, 
      }));

    if (groupList.length) {
      filtered = filtered.filter((group) => groupList.includes(group.name));
    }

    for (const group of filtered) {
      await this.parseGroupSchedule(group as ScheduleGroupType, period);
    }
  }

  async parseGroupSchedule (group: ScheduleGroupType, period: StudyingSemester) {
    const schedule: ScheduleType = (await axios.get('https://schedule.kpi.ua/api/schedule/lessons?groupId=' + group.id)).data.data;
    const dbGroup = await this.groupRepository.getOrCreate(group.name);
    await this.parseWeek(period, schedule.scheduleFirstWeek, dbGroup.id, 0);
    await this.parseWeek(period, schedule.scheduleSecondWeek, dbGroup.id, 1);
  }

  async parseWeek (period: StudyingSemester, week: ScheduleDayType[], groupId: string, weekNumber: number) {
    for (const day of week) {
      await this.parseDay(period, day, groupId, weekNumber);
    }
  }

  async parseDay (period: StudyingSemester, { day, pairs }: ScheduleDayType, groupId: string, weekNumber: number) {
    for (const pair of pairs) {
      const isSelective = pairs.some(({ name, time }) => pair.name !== name && pair.time === time);
      await this.parsePair(pair, groupId, period, isSelective, weekNumber, DAY_NUMBER[day]);
    }
  }

  async parsePair (pair: SchedulePairType, groupId: string, period: StudyingSemester, isSelective: boolean, week, day) {
    const teacher = pair.teacherName ? await this.getTeacher(pair.teacherName) : null;
    const subject = await this.subjectRepository.getOrCreate(pair.name ?? '');
    const name = DISCIPLINE_TYPE[pair.tag] ?? DISCIPLINE_TYPE.lec;
    const role = TEACHER_TYPE[pair.tag] ?? TEACHER_TYPE.lec;

    const { startDate: startOfSemester } = await this.dateService.getSemester(period);
    const [hours, minutes] = pair.time
      .split('.')
      .map((number) => +number);
    const startOfEvent = new Date(startOfSemester.getTime()+week*WEEK+(day-1)*DAY+hours*HOUR+minutes*MINUTE);
    const endOfEvent = new Date(startOfEvent.getTime()+16*WEEK+HOUR+35*MINUTE);

    let discipline =
      await this.disciplineRepository.find({
        subjectId: subject.id,
        groupId,
        year: period.year,
        semester: period.semester,
      });

    if (!discipline) {
      discipline = await this.disciplineRepository.create({
        subjectId: subject.id,
        groupId,
        year: period.year,
        semester: period.semester,
        disciplineTypes: {
          create: {
            name,
          },
        },
      });
    } else {
      const data = {
        isSelective: undefined,
        disciplineTypes: undefined,
      };

      if (!discipline.disciplineTypes.some((type) => type.name === name)) {
        data.disciplineTypes = {
          create: {
            name,
          },
        };
      }
      if (isSelective && !discipline.isSelective) {
        data.isSelective = isSelective;
      }

      if (data.disciplineTypes || data.isSelective) discipline = await this.disciplineRepository.updateById(discipline.id, data);
    }

    const disciplineType = discipline.disciplineTypes.find((type) => type.name === name);

    if (teacher) {
      const disciplineTeacher = await this.disciplineTeacherRepository.find({
        teacherId: teacher.id,
        disciplineId: discipline.id,
      });

      if (!disciplineTeacher) {
        await this.disciplineTeacherRepository.create({
          teacherId: teacher.id,
          disciplineId: discipline.id,
          roles: {
            create: {
              role,
              disciplineTypeId: disciplineType.id,
            },
          },
        });
      } else if (!disciplineTeacher.roles.some((r) => r.role === role)) {
        await this.disciplineTeacherRepository.updateById(disciplineTeacher.id, {
          roles: {
            create: {
              role,
              disciplineTypeId: disciplineType.id,
            },
          },
        });
      }
    }
    const event = await this.eventRepository.find({
      OR: [
        {
          startTime: startOfEvent,
          groupId: groupId,
          lessons: {
            some: {
              disciplineTypeId: disciplineType.id,
            },
          },
        },
        {
          startTime: new Date(startOfEvent.getTime() - WEEK),
          groupId: groupId,
          lessons: {
            some: {
              disciplineTypeId: disciplineType.id,
            },
          },
        },
      ],
    });

    if (!event) {
      await this.eventRepository.create({
        name: pair.name,
        startTime: startOfEvent,
        endTime: endOfEvent,
        period: Period.EVERY_FORTNIGHT,
        groupId: groupId,
        lessons: {
          create: {
            disciplineTypeId: disciplineType.id,
          },
        },
        eventInfo: {
          createMany: {
            data: this.getEventInfo(0, 7),
          },
        },
      });
    } else if (
      event.startTime.getTime() === startOfEvent.getTime() - WEEK &&
      event.period === Period.EVERY_FORTNIGHT
    ) {
      await this.eventRepository.updateById(event.id, {
        period: Period.EVERY_WEEK,
        endTime: endOfEvent,
        eventInfo: {
          createMany: {
            data: this.getEventInfo(8, 15),
          },
        },
      });
    }
  }

  private getEventInfo (startIndex: number, endIndex: number) {
    return Array.from({
      length: endIndex - startIndex + 1,
    }, (_, i) => ({
      number: i + startIndex,
    }));
  }

  async getTeacher (teacherName: string) {
    let [lastName, firstName, middleName] = teacherName.split(' ');

    lastName = lastName.trim().replace('.', '');
    firstName = firstName.trim().replace('.', '');
    middleName = middleName.trim().replace('.', '');

    if (firstName.length <= 1 || middleName.length <= 1) {
      const teachers = await this.teacherRepository.findMany({
        where: { lastName, firstName: { startsWith: firstName }, middleName: { startsWith: middleName } },
      });

      if (teachers.length === 1) return teachers[0];
    }

    // If several teachers with same initials or if there is no such teacher at all
    return await this.teacherRepository.getOrCreate({
      lastName,
      firstName,
      middleName,
    });
  }
}
