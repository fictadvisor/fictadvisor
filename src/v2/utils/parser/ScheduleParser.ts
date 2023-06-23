import { Injectable } from '@nestjs/common';
import { Parser } from './Parser';
import axios from 'axios';
import { DisciplineTypeEnum, TeacherRole } from '@prisma/client';
import { DisciplineTeacherRepository } from '../../database/repositories/DisciplineTeacherRepository';
import { DisciplineTeacherRoleRepository } from '../../database/repositories/DisciplineTeacherRoleRepository';
import { GroupRepository } from '../../database/repositories/GroupRepository';
import { DisciplineRepository } from '../../database/repositories/DisciplineRepository';
import { SubjectRepository } from '../../database/repositories/SubjectRepository';
import { TeacherRepository } from '../../database/repositories/TeacherRepository';
import { ScheduleDayType, ScheduleGroupType, SchedulePairType, ScheduleType } from './ScheduleParserTypes';
// import { ScheduleRepository } from '../../api/schedule/ScheduleRepository';

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
    // private scheduleRepository: ScheduleRepository,
    private disciplineRepository: DisciplineRepository,
    private disciplineTeacherRepository: DisciplineTeacherRepository,
    private disciplineTeacherRoleRepository: DisciplineTeacherRoleRepository,
  ) {}

  async parse (period={}) {
    const groups: ScheduleGroupType[] = (await axios.get('https://schedule.kpi.ua/api/schedule/groups')).data.data;
    const filtered = groups.filter((group) => group.faculty === 'ФІОТ').map((group) => ({ id: group.id, name: group.name }));

    for (const group of filtered) {
      await this.parseGroupSchedule(group as ScheduleGroupType, period);
    }
  }

  async parseGroupSchedule (group: ScheduleGroupType, period: any) {
    const schedule: ScheduleType = (await axios.get('https://schedule.kpi.ua/api/schedule/lessons?groupId=' + group.id)).data.data;
    const dbGroup = await this.groupRepository.getOrCreate(group.name);
    await this.parseWeek(period, schedule.scheduleFirstWeek, dbGroup.id, 0);
    await this.parseWeek(period, schedule.scheduleSecondWeek, dbGroup.id, 1);
  }

  async parseWeek (period: any, week: ScheduleDayType[], groupId: string, weekNumber: number) {
    for (const day of week) {
      await this.parseDay(period, day, groupId, weekNumber);
    }
  }

  async parseDay (period: any, { day, pairs }: ScheduleDayType, groupId: string, weekNumber: number) {
    for (const pair of pairs) {
      const isSelective = pairs.some(({ name, time }) => pair.name !== name && pair.time === time);
      await this.parsePair(pair, groupId, period, isSelective, weekNumber, DAY_NUMBER[day]);
    }
  }

  async parsePair (pair: SchedulePairType, groupId: string, period: any, isSelective: boolean, week, day) {
    const teacher = pair.teacherName ? await this.getTeacher(pair.teacherName) : null;
    const subject = await this.subjectRepository.getOrCreate(pair.name ?? '');
    const [startHours, startMinutes] = pair.time.split('.').map((s) => +s);
    const endHours = startHours + 1;
    const endMinutes = startMinutes + 35;
    const name = DISCIPLINE_TYPE[pair.tag] ?? DISCIPLINE_TYPE.lec;
    const role = TEACHER_TYPE[pair.tag] ?? TEACHER_TYPE.lec;
    // const startDate = this.createDate(day, week, startHours, startMinutes);
    // const endDate = this.createDate(day, week, endHours, endMinutes);

    let discipline =
      await this.disciplineRepository.getOrCreate({
        subjectId: subject.id,
        groupId,
        year: period.year,
        semester: period.semester,
      });

    if (isSelective && !discipline.isSelective) {
      discipline = await this.disciplineRepository.updateById(discipline.id, { isSelective });
    }

    if (!discipline.disciplineTypes.some((type) => type.name === name)) {
      discipline = await this.disciplineRepository.updateById(discipline.id, {
        disciplineTypes: {
          create: {
            name,
          },
        },
      });
    }

    const disciplineType = discipline.disciplineTypes.find((type) => type.name === name);

    if (teacher) {
      const disciplineTeacher = await this.disciplineTeacherRepository.getOrCreate({
        teacherId: teacher.id,
        disciplineId: discipline.id,
      });

      await this.disciplineTeacherRoleRepository.getOrCreate({
        role,
        disciplineTeacherId: disciplineTeacher.id,
        disciplineTypeId: disciplineType.id,
      });
    }

    // await this.scheduleRepository.getOrCreateSemesterLesson({
    //   disciplineTypeId: disciplineType.id,
    //   startDate,
    //   endDate,
    // });
  }

  createDate (day, week, hours, minutes): Date {
    return new Date(1970, 0, day + week * 7, hours, minutes);
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
