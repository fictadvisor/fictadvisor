import { Injectable } from '@nestjs/common';
import { Parser } from './Parser';
import axios from 'axios';
import { DisciplineTypeEnum, TeacherRole } from '@prisma/client';
import { DisciplineTeacherRepository } from '../../api/teacher/DisciplineTeacherRepository';
import { DisciplineTeacherRoleRepository } from '../../api/teacher/DisciplineTeacherRoleRepository';
import { DisciplineTypeRepository } from '../../api/discipline/DisciplineTypeRepository';
import { GroupRepository } from '../../api/group/GroupRepository';
import { DisciplineRepository } from '../../api/discipline/DisciplineRepository';
import { SubjectRepository } from '../../api/subject/SubjectRepository';
import { TeacherRepository } from '../../api/teacher/TeacherRepository';
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
    private disciplineTypeRepository: DisciplineTypeRepository,
    private disciplineTeacherRepository: DisciplineTeacherRepository,
    private disciplineTeacherRoleRepository: DisciplineTeacherRoleRepository,
  ) {}

  async parse () {
    const groups = await axios.get('https://schedule.kpi.ua/api/schedule/groups');
    const filtered = groups.data.data.filter((group) => group.faculty === 'ФІОТ').map((group) => ({ id: group.id, name: group.name }));

    for (const group of filtered) {
      await this.parseGroupSchedule(group);
    }
  }

  async parseGroupSchedule (group) {
    const schedule = (await axios.get('https://schedule.kpi.ua/api/schedule/lessons?groupId=' + group.id)).data.data;
    const dbGroup = await this.groupRepository.getOrCreate(group.name);
    await this.parseWeek(schedule.scheduleFirstWeek, dbGroup.id, 0);
    await this.parseWeek(schedule.scheduleSecondWeek, dbGroup.id, 1);
  }

  async parseWeek (week, groupId, weekNumber) {
    for (const day of week) {
      await this.parseDay(day, groupId, weekNumber);
    }
  }

  async parseDay ({ day, pairs }, groupId, weekNumber) {
    for (const pair of pairs) {
      await this.parsePair(pair, groupId, weekNumber, DAY_NUMBER[day]);
    }
  }

  async parsePair (pair, groupId, week, day) {
    const [lastName = '', firstName = '', middleName = ''] = pair.teacherName.split(' ');
    const teacher = await this.teacherRepository.getOrCreate({ lastName, firstName, middleName });
    const subject = await this.subjectRepository.getOrCreate(pair.name ?? '');
    const [startHours, startMinutes] = pair.time.split('.').map((s) => +s);
    const endHours = startHours + 1;
    const endMinutes = startMinutes + 35;
    const name = DISCIPLINE_TYPE[pair.tag] ?? DISCIPLINE_TYPE.lec;
    const role = TEACHER_TYPE[pair.tag] ?? TEACHER_TYPE.lec;
    const startDate = this.createDate(day, week, startHours, startMinutes);
    const endDate = this.createDate(day, week, endHours, endMinutes);

    const discipline =
      await this.disciplineRepository.getOrCreate({
        subjectId: subject.id,
        groupId,
        year: 2022,
        semester: 1,
      });

    const disciplineType =
      await this.disciplineTypeRepository.getOrCreate({
        disciplineId: discipline.id,
        name,
      });

    const disciplineTeacher =
      await this.disciplineTeacherRepository.getOrCreate({
        teacherId: teacher.id,
        disciplineId: discipline.id,
      });

    await this.disciplineTeacherRoleRepository.getOrCreate({
      role,
      disciplineTeacherId: disciplineTeacher.id,
      disciplineTypeId: disciplineType.id,
    });

    // await this.scheduleRepository.getOrCreateSemesterLesson({
    //   disciplineTypeId: disciplineType.id,
    //   startDate,
    //   endDate,
    // });
  }

  createDate (day, week, hours, minutes): Date {
    return new Date(1970, 0, day + week * 7, hours, minutes);
  }
}
