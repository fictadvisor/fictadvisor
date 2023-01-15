import { Injectable } from '@nestjs/common';
import { Parser } from './Parser';
import axios from 'axios';
import { PrismaService } from '../../database/PrismaService';
import { DisciplineTypeEnum, TeacherRole } from '@prisma/client';

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
  constructor(
    private prisma: PrismaService
  ) {}

  async parse() {
    const groups = await axios.get('https://schedule.kpi.ua/api/schedule/groups');
    const filtered = groups.data.data.filter(group => group.faculty === 'ФІОТ').map(group => ({id: group.id, name: group.name}));

    for (const group of filtered) {
      await this.parseGroupSchedule(group);
    }
  }

  async parseGroupSchedule(group) {
    const schedule = (await axios.get('https://schedule.kpi.ua/api/schedule/lessons?groupId=' + group.id)).data.data;
    const groupId: string = await this.parseGroup(group.name);
    await this.parseWeek(schedule.scheduleFirstWeek, groupId, 0);
    await this.parseWeek(schedule.scheduleSecondWeek, groupId, 1);
  }

  async parseWeek(week, groupId, weekNumber) {
    for (const day of week) {
      await this.parseDay(day, groupId, weekNumber);
    }
  }

  async parseDay({day, pairs}, groupId, weekNumber) {
    for (const pair of pairs) {
      await this.parsePair(pair, groupId, weekNumber, DAY_NUMBER[day]);
    }
  }

  async parsePair(pair, groupId, week, day) {
    const teacherId: string = await this.parseTeacher(pair.teacherName ?? '');
    const subjectId: string = await this.parseSubject(pair.name ?? '');
    const [startHours, startMinutes] = pair.time.split('.').map(s => +s);
    const endHours = startHours + 1;
    const endMinutes = startMinutes + 35;
    const disciplineType = DISCIPLINE_TYPE[pair.tag] ?? DISCIPLINE_TYPE.lec;
    const teacherRole = TEACHER_TYPE[pair.tag] ?? TEACHER_TYPE.lec;
    const startDate = this.createDate(day, week, startHours, startMinutes);
    const endDate = this.createDate(day, week, endHours, endMinutes);

    const disciplineId: string = await this.parseDiscipline(subjectId, groupId);
    const disciplineTypeId: string = await this.parseDisciplineType(disciplineId, disciplineType);
    await this.parseDisciplineTeacher(teacherId, teacherRole, disciplineTypeId);
    await this.parseLesson(disciplineTypeId, startDate, endDate);
  }

  async parseTeacher(teacherName: string): Promise<string> {
    const [lastName = '', firstName = '', middleName = ''] = teacherName.split(' ');

    let teacher = await this.prisma.teacher.findFirst({
      where: {
        firstName,
        middleName,
        lastName,
      },
    });

    if (!teacher) {
      teacher = await this.prisma.teacher.create({
        data: {
          firstName,
          middleName,
          lastName,
        },
      });
    }

    return teacher.id;
  }

  async parseSubject(name: string): Promise<string> {
    let subject = await this.prisma.subject.findFirst({
      where: {
        name,
      },
    });

    if (!subject) {
      subject = await this.prisma.subject.create({
        data: {
          name,
        },
      });
    }

    return subject.id;
  }

  async parseGroup(code: string): Promise<string> {
    let group = await this.prisma.group.findFirst({
      where: {
        code,
      },
    });

    if (!group) {
      group = await this.prisma.group.create({
        data: {
          code,
        },
      });
    }

    return group.id;
  }

  async parseDiscipline(subjectId: string, groupId: string) {
    let discipline = await this.prisma.discipline.findFirst({
      where: {
        subjectId,
        groupId,
      },
    });

    if (!discipline) {
      discipline = await this.prisma.discipline.create({
        data: {
          subjectId,
          groupId,
          year: 2022,
          semester: 1,
        },
      });
    }

    return discipline.id;
  }

  async parseDisciplineType(disciplineId: string, name: DisciplineTypeEnum): Promise<string> {
    let disciplineType = await this.prisma.disciplineType.findFirst({
      where: {
        disciplineId,
        name,
      },
    });

    if (!disciplineType) {
      disciplineType = await this.prisma.disciplineType.create({
        data: {
          disciplineId,
          name,
        },
      });
    }

    return disciplineType.id;
  }

  async parseDisciplineTeacher(teacherId: string, role: TeacherRole, disciplineTypeId: string) {
    const disciplineTeacher = await this.prisma.disciplineTeacher.findFirst({
      where: {
        teacherId,
        role,
        disciplineTypeId,
      },
    });

    if (!disciplineTeacher) {
      await this.prisma.disciplineTeacher.create({
        data: {
          teacherId,
          role,
          disciplineTypeId,
        },
      });
    }
  }

  createDate(day, week, hours, minutes): Date {
    return new Date(1970, 0, day + week * 7, hours, minutes);
  }

  async parseLesson(disciplineTypeId: string, startDate: Date, endDate: Date) {
    const lesson = await this.prisma.semesterLesson.findFirst({
      where: {
        disciplineTypeId,
        startDate,
        endDate,
      },
    });

    if (!lesson) {
      await this.prisma.semesterLesson.create({
        data: {
          disciplineTypeId,
          startDate,
          endDate,
        },
      });
    }
  }
}