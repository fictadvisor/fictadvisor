import { Injectable } from '@nestjs/common';
import { Parser } from './Parser';
import axios from 'axios';
import { DisciplineTypeEnum } from '@prisma/client';
import { ScheduleDayType, ScheduleGroupType, SchedulePairType, ScheduleType } from './ScheduleParserTypes';
import { DateService, StudyingSemester } from '../date/DateService';
import { DbSubject } from '../../database/entities/DbSubject';
import { DbDiscipline } from '../../database/entities/DbDiscipline';
import { DisciplineRepository } from '../../database/repositories/DisciplineRepository';
import { DbTeacher } from '../../database/entities/DbTeacher';
import { DbDisciplineType } from '../../database/entities/DbDisciplineType';
import { DisciplineTeacherRepository } from '../../database/repositories/DisciplineTeacherRepository';
import { SubjectRepository } from '../../database/repositories/SubjectRepository';
import { GroupService } from '../../api/services/GroupService';
import { GeneralParser } from './GeneralParser';

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

@Injectable()
export class CampusParser implements Parser {
  constructor (
    private groupService: GroupService,
    private subjectRepository: SubjectRepository,
    private disciplineRepository: DisciplineRepository,
    private disciplineTeacherRepository: DisciplineTeacherRepository,
    private dateService: DateService,
    private generalParser: GeneralParser,
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
    const [{ data }, { id }] = await Promise.all([
      axios.get('https://api.campus.kpi.ua/schedule/lessons?groupId=' + group.id),
      this.groupService.getOrCreate({ code: group.name }),
    ]);

    const { scheduleFirstWeek, scheduleSecondWeek } = data.data as ScheduleType;

    await this.parseWeek(period, scheduleFirstWeek, id, 0);
    await this.parseWeek(period, scheduleSecondWeek, id, 1);
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
    const { teacher, subject, name } = await this.initializeData(pair);

    const { startDate: startOfSemester } = await this.dateService.getSemester(period);
    const { startOfEvent, endOfEvent } = await this.dateService.getEventTime(pair.time, startOfSemester, week, day);

    const discipline = await this.getOrCreateDiscipline(subject, groupId, period, name, isSelective);

    const disciplineType = discipline.disciplineTypes.find((type) => type.name === name);

    if (teacher) await this.createOrUpdateDisciplineTeacher(teacher, discipline, disciplineType);

    await this.generalParser.handleEvent(pair, startOfEvent, endOfEvent, groupId, disciplineType.id);
  }

  async initializeData (pair: SchedulePairType) {
    const teacher = pair.teacherName ? await this.getTeacherByString(pair.teacherName) : null;
    const subject = await this.subjectRepository.getOrCreate(pair.name ?? '');
    const name = DISCIPLINE_TYPE[pair.tag] ?? DISCIPLINE_TYPE.lec;

    return { teacher, subject, name };
  }

  async getTeacherByString (teacherName: string) : Promise<DbTeacher> {
    let [lastName, firstName, middleName] = teacherName.split(' ');

    lastName = lastName.trim().replace('.', '');
    firstName = firstName.trim().replace('.', '');
    middleName = middleName.trim().replace('.', '');

    return await this.generalParser.getTeacherFullInitials(lastName, firstName, middleName);
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
        disciplineTypes: { create: { name } },
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

  async createOrUpdateDisciplineTeacher (teacher: DbTeacher, discipline: DbDiscipline, disciplineType: DbDisciplineType) {
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
            disciplineTypeId: disciplineType.id,
          },
        },
      });
    } else if (!disciplineTeacher.roles.some((r) => r.disciplineType.name === disciplineType.name)) {
      await this.disciplineTeacherRepository.updateById(disciplineTeacher.id, {
        roles: {
          create: {
            disciplineTypeId: disciplineType.id,
          },
        },
      });
    }
  }
}
