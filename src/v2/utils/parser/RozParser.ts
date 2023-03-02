import axios from 'axios';
import { JSDOM } from 'jsdom';
import { URLSearchParams } from 'node:url';
import { Injectable } from '@nestjs/common';
import { Parser } from './Parser';
import { DisciplineTypeEnum, TeacherRole } from '@prisma/client';
import { DisciplineTeacherRepository } from '../../api/teacher/DisciplineTeacherRepository';
import { DisciplineTeacherRoleRepository } from '../../api/teacher/DisciplineTeacherRoleRepository';
import { DisciplineTypeRepository } from '../../api/discipline/DisciplineTypeRepository';
import { GroupRepository } from '../../api/group/GroupRepository';
import { DisciplineRepository } from '../../api/discipline/DisciplineRepository';
import { SubjectRepository } from '../../api/subject/SubjectRepository';
import { TeacherRepository } from '../../api/teacher/TeacherRepository';
import { ScheduleRepository } from '../../api/schedule/ScheduleRepository';
import { GroupService } from '../../api/group/GroupService';

export const DISCIPLINE_TYPE = {
  Лек: DisciplineTypeEnum.LECTURE,
  Прак: DisciplineTypeEnum.PRACTICE,
  Лаб: DisciplineTypeEnum.LABORATORY,
};

export const TEACHER_TYPE = {
  Лек: TeacherRole.LECTURER,
  Прак: TeacherRole.PRACTICIAN,
  Лаб: TeacherRole.LABORANT,
};

const SEMESTER = 1;

const VIEW_SCHEDULE_PARAMS = new URLSearchParams({
  __EVENTVALIDATION:
    '/wEdAAEAAAD/////AQAAAAAAAAAPAQAAAAYAAAAIsA3rWl3AM+6E94I5ke7WZqDu1maj7tZmCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANqZqakPTbOP2+koNozn1gOvqUEW',
  __EVENTTARGET: '',
  ctl00$MainContent$ddlSemesterType: SEMESTER.toString(),
});

const WEEK_TAGS = {
  0: 'ctl00_MainContent_FirstScheduleTable',
  1: 'ctl00_MainContent_SecondScheduleTable',
};

@Injectable()
export class RozParser implements Parser {
  constructor (
    private groupRepository: GroupRepository,
    private teacherRepository: TeacherRepository,
    private subjectRepository: SubjectRepository,
    private scheduleRepository: ScheduleRepository,
    private disciplineRepository: DisciplineRepository,
    private disciplineTypeRepository: DisciplineTypeRepository,
    private disciplineTeacherRepository: DisciplineTeacherRepository,
    private disciplineTeacherRoleRepository: DisciplineTeacherRoleRepository,
    private groupService: GroupService,
  ) {}

  async parse () {
    const groups = (await axios.post('http://epi.kpi.ua/Schedules/ScheduleGroupSelection.aspx/GetGroups', {
      count: 10,
      prefixText: 'і',
    })).data.d.filter((name: string) => /І[МПКАСОВТ]-([зпв]|зп)?\d\d(мн|мп|ф)?і?/.test(name));

    for (const group of groups) {
      if (group.endsWith('ф')) continue;
      await this.parseGroupSchedule(group);
    }
  }

  async parseGroupSchedule (code) {
    const groupHashId = await this.getGroupHashId(code);
    const url = `http://epi.kpi.ua/Schedules/ViewSchedule.aspx?g=${groupHashId}`;

    const response = await axios.post(url, VIEW_SCHEDULE_PARAMS);

    await new Promise((res) => setTimeout(() => (res('')), 3000));
    const dom = new JSDOM(response.data);

    await this.parseWeek(0, code, dom);
    await this.parseWeek(1, code, dom);
  }

  async getGroupHashId (group) {
    const SCHEDULE_GROUP_SELECTION_PARAMS = new URLSearchParams({
      __EVENTVALIDATION:
        '/wEdAAEAAAD/////AQAAAAAAAAAPAQAAAAUAAAAIsA3rWl3AM+6E94I5Tu9cRJoVjv0LAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHfLZVQO6kVoZVPGurJN4JJIAuaU',
      __EVENTTARGET: '',
      ctl00$MainContent$ctl00$txtboxGroup: group,
      ctl00$MainContent$ctl00$btnShowSchedule: 'Розклад занять',
    });
    const url = 'http://epi.kpi.ua/Schedules/ScheduleGroupSelection.aspx';
    const response = await axios.post(url, SCHEDULE_GROUP_SELECTION_PARAMS);
    const dom = new JSDOM(response.data);

    const form = dom.window.document.querySelector('form[name=\'aspnetForm\']');
    return form.getAttribute('action').split('?g=')[1];
  }

  async parseHtmlWeek (week, group, dom) {
    const pairs = [];
    const table = dom.window.document.getElementById(WEEK_TAGS[week]);

    for (let i = 1; i < table.rows.length; i++) {
      const row = table.rows[i];

      const time = row.childNodes[1].innerHTML.split('<br>')[1];

      for (let j = 2; j < row.childNodes.length; j++) {
        const td = row.childNodes[j];

        // Check for empty day - no lessons
        if (td.innerHTML === '' || td.innerHTML === undefined) continue;

        const day = j - 1;

        const localRowPairs = [];

        // Лек | Лаб | Прак
        const pairType = td.lastChild.textContent.split(' ')[1];
        const span = td.childNodes[0];

        let spanLinksCounter = 0;

        // Iterating span for getting discipline links data
        for (let k = 0; k < span.childNodes.length; k++) {
          const element = span.childNodes[k];
          if (element instanceof dom.window.Text) continue;
          localRowPairs[spanLinksCounter] = {
            name: element.textContent,
            tag: pairType,
            day,
            week,
            time,
            group,
          };
          spanLinksCounter += 1;
        }

        let linksCounter = 0;

        // Getting teacher links data
        for (let k = 1; k < td.childNodes.length - 1; k++) {
          const element = td.childNodes[k];
          if (
            element instanceof dom.window.HTMLBRElement ||
            element instanceof dom.window.Text ||
            element.textContent.startsWith('-18') // if several links type of "-18 Лек on-line" ...
          )
            continue;
          const teacherString = element.getAttribute('title').split(' ');
          if (!localRowPairs[linksCounter]) continue; 
          localRowPairs[linksCounter].teacher = {
            lastName: teacherString[teacherString.length - 1 - 2] ?? '',
            firstName: teacherString[teacherString.length - 1 - 1] ?? '',
            middleName: teacherString[teacherString.length - 1 - 0] ?? '',
          };
          linksCounter += 1;
        }
        pairs.push(...localRowPairs);
      }
    }

    return pairs;
  }

  async parseWeek (weekNumber, code, dom) {
    const week = await this.parseHtmlWeek(weekNumber, code, dom);
    const group = await this.groupService.getOrCreate(code);
    for (const pair of week) {
      await this.parsePair(pair, group.id);
    }
  }

  async parsePair (pair, groupId) {
    const { lastName, firstName, middleName } = pair.teacher;
    const teacher = await this.teacherRepository.getOrCreate({
      lastName,
      firstName,
      middleName,
    });

    const subject = await this.subjectRepository.getOrCreate(pair.name ?? '');
    const [startHours, startMinutes] = pair.time
      .split(':')
      .map((s) => parseInt(s));
    const endHours = startHours + 1;
    const endMinutes = startMinutes + 35;

    const name = DISCIPLINE_TYPE[pair.tag] ?? DISCIPLINE_TYPE.Лек;
    const role = TEACHER_TYPE[pair.tag] ?? TEACHER_TYPE.Лек;
    const startDate = this.createDate(
      pair.day,
      pair.week,
      startHours,
      startMinutes
    );
    const endDate = this.createDate(pair.day, pair.week, endHours, endMinutes);

    const discipline = await this.disciplineRepository.getOrCreate({
      subjectId: subject.id,
      groupId,
      year: 2022,
      semester: 1,
    });

    const disciplineType = await this.disciplineTypeRepository.getOrCreate({
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

    await this.scheduleRepository.getOrCreateSemesterLesson({
      disciplineTypeId: disciplineType.id,
      startDate,
      endDate,
    });
  }

  createDate (day, week, hours, minutes): Date {
    return new Date(1970, 0, day + week * 7, hours, minutes);
  }
}
