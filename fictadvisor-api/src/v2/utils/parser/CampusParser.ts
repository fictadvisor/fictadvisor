import { Injectable } from '@nestjs/common';
import { Parser } from './Parser';
import axios from 'axios';
import { DisciplineTypeEnum, Period, TeacherRole } from '@prisma/client';
import { ScheduleDayType, ScheduleGroupType, SchedulePairType, ScheduleType } from './ScheduleParserTypes';
import { DateService, FORTNITE, WEEK, StudyingSemester } from '../date/DateService';
import { weeksPerEvent } from '../../api/services/ScheduleService';
import { DateUtils } from '../date/DateUtils';
import { DbSubject } from '../../database/entities/DbSubject';
import { DbDiscipline } from '../../database/entities/DbDiscipline';
import { DisciplineRepository } from '../../database/repositories/DisciplineRepository';
import { DbTeacher } from '../../database/entities/DbTeacher';
import { DbDisciplineType } from '../../database/entities/DbDisciplineType';
import { DisciplineTeacherRepository } from '../../database/repositories/DisciplineTeacherRepository';
import { EventRepository } from '../../database/repositories/EventRepository';
import { TeacherRepository } from '../../database/repositories/TeacherRepository';
import { SubjectRepository } from '../../database/repositories/SubjectRepository';
import { GroupRepository } from '../../database/repositories/GroupRepository';

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
export class CampusParser implements Parser {
  constructor (
    private groupRepository: GroupRepository,
    private subjectRepository: SubjectRepository,
    private disciplineRepository: DisciplineRepository,
    private eventRepository: EventRepository,
    private disciplineTeacherRepository: DisciplineTeacherRepository,
    private teacherRepository: TeacherRepository,
    private dateService: DateService,
    private dateUtils: DateUtils,
  ) {}

  async parse (period: StudyingSemester, groupList: string[]) {
    const groups: ScheduleGroupType[] = (await axios.get('https://api.campus.kpi.ua/schedule/groups')).data.data;
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
    const schedule: ScheduleType = (await axios.get('https://api.campus.kpi.ua/schedule/lessons?groupId=' + group.id)).data.data;
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

  async parsePair (pair: SchedulePairType, groupId: string, period: StudyingSemester, isSelective: boolean, week: number, day: number) {
    const { teacher, subject, name, role } = await this.initializeData(pair);

    const { startDate: startOfSemester } = await this.dateService.getSemester(period);
    const { startOfEvent, endOfEvent } = await this.dateService.getEventTime(pair.time, startOfSemester, week, day);

    const discipline = await this.getOrCreateDiscipline(subject, groupId, period, name, isSelective);

    const disciplineType = discipline.disciplineTypes.find((type) => type.name === name);

    if (teacher) {
      await this.createOrUpdateDisciplineTeacher(teacher, discipline, role, disciplineType);
    }
    const event = await this.findEvent(startOfEvent, groupId, disciplineType.id);

    if (!event) {
      await this.createEvent(pair.name, startOfEvent, endOfEvent, groupId, disciplineType.id, Period.EVERY_FORTNIGHT);
    } else if (
      event.startTime.getTime() === startOfEvent.getTime() - WEEK &&
      event.period === Period.EVERY_FORTNIGHT
    ) {
      await this.updateEventPeriod(Period.EVERY_WEEK, event.id);
    }
  }

  async initializeData (pair: SchedulePairType) {
    const teacher = pair.teacherName ? await this.getTeacherByString(pair.teacherName) : null;
    const subject = await this.subjectRepository.getOrCreate(pair.name ?? '');
    const name = DISCIPLINE_TYPE[pair.tag] ?? DISCIPLINE_TYPE.lec;
    const role = TEACHER_TYPE[pair.tag] ?? TEACHER_TYPE.lec;

    return { teacher, subject, name, role };
  }

  async getTeacherByString (teacherName: string) : Promise<DbTeacher> {
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

    return await this.teacherRepository.getOrCreate({
      lastName,
      firstName,
      middleName,
    });
  }

  async getOrCreateDiscipline (subject: DbSubject, groupId: string, period: StudyingSemester, name: DisciplineTypeEnum, isSelective: boolean) {
    let discipline = await this.disciplineRepository.find({
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
        isSelective,
      });
    } else {
      discipline = await this.updateDiscipline(discipline, name, isSelective);
    }
    return discipline;
  }

  async updateDiscipline (discipline: DbDiscipline, name: string, isSelective: boolean) {
    const data = await this.getDisciplineUpdateData(discipline, name, isSelective);
    if (Object.keys(data).length !== 0) {
      discipline = await this.disciplineRepository.updateById(discipline.id, data);
    }
    return discipline;
  }

  async getDisciplineUpdateData (discipline: DbDiscipline, name: string, isSelective: boolean) {
    const data: any = {};

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
    return data;
  }

  async createOrUpdateDisciplineTeacher (teacher: DbTeacher, discipline: DbDiscipline, role: TeacherRole, disciplineType: DbDisciplineType) {
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

  async findEvent (startOfEvent: Date, groupId: string, disciplineTypeId: string) {
    return this.eventRepository.find({
      OR: [
        {
          startTime: startOfEvent,
          groupId: groupId,
          lessons: {
            some: {
              disciplineTypeId,
            },
          },
        },
        {
          startTime: new Date(startOfEvent.getTime() - WEEK),
          groupId: groupId,
          lessons: {
            some: {
              disciplineTypeId,
            },
          },
        },
      ],
    });
  }

  async createEvent (name: string, startOfEvent: Date, endOfEvent: Date, groupId: string, disciplineTypeId: string, period: Period) {
    await this.eventRepository.create({
      name,
      startTime: startOfEvent,
      endTime: endOfEvent,
      period,
      eventsAmount: await this.getEventsAmount(period),
      groupId: groupId,
      lessons: {
        create: {
          disciplineTypeId,
        },
      },
    });
  }

  async updateEventPeriod (period: Period, eventId: string) {
    await this.eventRepository.updateById(eventId, {
      period,
      eventsAmount: await this.getEventsAmount(period),
    });
  }

  async getEventsAmount (period: Period) {
    const { startDate, endDate } = await this.dateService.getCurrentSemester();
    const lastWeek = this.dateUtils.getCeiledDifference(startDate, new Date(endDate.getTime() - FORTNITE), WEEK);
    return lastWeek / weeksPerEvent[period];
  }
}
