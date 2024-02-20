import axios from 'axios';
import { JSDOM } from 'jsdom';
import { Injectable } from '@nestjs/common';
import { Parser } from './Parser';
import { DisciplineTypeEnum, Period, TeacherRole } from '@prisma/client';
import { DisciplineTeacherRepository } from '../../database/repositories/DisciplineTeacherRepository';
import { DisciplineTeacherRoleRepository } from '../../database/repositories/DisciplineTeacherRoleRepository';
import { GroupRepository } from '../../database/repositories/GroupRepository';
import { DisciplineRepository } from '../../database/repositories/DisciplineRepository';
import { SubjectRepository } from '../../database/repositories/SubjectRepository';
import { DateService, DAY, FORTNITE, HOUR, MINUTE, StudyingSemester, WEEK } from '../date/DateService';
import { EventRepository } from '../../database/repositories/EventRepository';
import { DateUtils } from '../date/DateUtils';
import { weeksPerEvent } from '../../api/services/ScheduleService';
import {
  DOMAIN_EXTRACTION_REGEX,
  getSchedulesParams,
  GOOGLE_MAPS_URL,
  GROUP_CODE_REGEX,
  GROUP_SELECTION_URL,
  SCHEDULE_GROUP_SELECTION_URL,
  SCHEDULE_SELECTION_FORM_SELECTOR,
  VIEW_SCHEDULE_PARAMS,
  VIEW_SCHEDULE_URL_BASE,
  WEEK_TAGS,
} from './RozParams';
import { TeacherService } from '../../api/services/TeacherService';

const DISCIPLINE_TYPE = {
  Лек: DisciplineTypeEnum.LECTURE,
  Прак: DisciplineTypeEnum.PRACTICE,
  Лаб: DisciplineTypeEnum.LABORATORY,
};

const TEACHER_TYPE = {
  Лек: TeacherRole.LECTURER,
  Прак: TeacherRole.PRACTICIAN,
  Лаб: TeacherRole.LABORANT,
};

@Injectable()
export class RozParser implements Parser {
  constructor (
    private groupRepository: GroupRepository,
    private teacherService: TeacherService,
    private subjectRepository: SubjectRepository,
    private disciplineRepository: DisciplineRepository,
    private disciplineTeacherRepository: DisciplineTeacherRepository,
    private disciplineTeacherRoleRepository: DisciplineTeacherRoleRepository,
    private eventRepository: EventRepository,
    private dateService: DateService,
    private dateUtils: DateUtils,
  ) {}

  async parse (period: StudyingSemester, groupList: string[], page = 1) {
    const groupsPerPage = 40;
    const groupSelectionCount = 10;

    let filtered = (await axios.post(GROUP_SELECTION_URL, {
      count: groupSelectionCount,
      prefixText: 'і',
    })).data.d
      .filter((name: string) => GROUP_CODE_REGEX.test(name));

    filtered = groupList.length
      ? filtered.filter((group: string) => groupList.includes(group))
      : filtered.slice((page - 1) * groupsPerPage, page * groupsPerPage);

    const excludeGroupSuffix = 'ф';
    for (const group of filtered) {
      if (group.endsWith(excludeGroupSuffix)) continue;
      await this.parseGroupSchedule(group, period);
    }
  }

  async parseGroupSchedule (groupCode: string, period: StudyingSemester) {
    const groupHashId = await this.getGroupHashId(groupCode);
    const url = `${VIEW_SCHEDULE_URL_BASE}${groupHashId}`;

    const response = await axios.post(url, VIEW_SCHEDULE_PARAMS);

    await new Promise((res) => setTimeout(() => (res('')), 3000));
    const dom = new JSDOM(response.data);

    await this.parseWeek(0, groupCode, dom, period);
    await this.parseWeek(1, groupCode, dom, period);
  }

  async parseWeek (weekNumber: number, groupCode: string, dom: JSDOM, period: StudyingSemester) {
    const week = await this.parseHtmlWeek(weekNumber, groupCode, dom);
    const group = await this.groupRepository.getOrCreate(groupCode);
    for (const pair of week) {
      await this.parsePair(pair, group.id, period);
    }
  }

  async getGroupHashId (group: string) {
    const params = getSchedulesParams(group);

    const response = await axios.post(SCHEDULE_GROUP_SELECTION_URL, params);
    const dom = new JSDOM(response.data);

    const form = dom.window.document.querySelector(SCHEDULE_SELECTION_FORM_SELECTOR);
    return form.getAttribute('action').split('?g=')[1];
  }

  async parseHtmlWeek (week: number, group: string, dom) {
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

        // Filter junk
        const teacherLinks = Object.values(td.childNodes).filter((n: any) => !(n instanceof dom.window.HTMLBRElement
          || n instanceof dom.window.Text
          || n instanceof dom.window.HTMLSpanElement
          || n.href.match(DOMAIN_EXTRACTION_REGEX)?.includes(GOOGLE_MAPS_URL)));

        for (let k = 0; k < teacherLinks.length; k++) {
          const anchor = teacherLinks[k] as HTMLAnchorElement;
          const teacherString = anchor.getAttribute('title').split(' ');

          const parseTeacherName = (str: string[]) => ({
            lastName: str[str.length - 1 - 2].replace('.', '') ?? '',
            firstName: str[str.length - 1 - 1].replace('.', '') ?? '',
            middleName: str[str.length - 1].replace('.', '') ?? '',
          });
          // Previous and last teacher bind to the last discipline
          if (teacherLinks.length > localRowPairs.length && k === teacherLinks.length - 1 - 1) {
            const nextAnchor = teacherLinks[k + 1] as HTMLAnchorElement;
            const mainTeacher = parseTeacherName(teacherString);
            const secondaryTeacher = parseTeacherName(nextAnchor.getAttribute('title').split(' '));
            localRowPairs[linksCounter].teachers = [mainTeacher, secondaryTeacher];
            // Force loop finish
            k += 1;
            continue;
          }
          localRowPairs[linksCounter].teacher = parseTeacherName(teacherString);
          linksCounter += 1;
        }
        pairs.push(...localRowPairs);
      }
    }

    return pairs;
  }

  async parsePair (pair, groupId: string, period: StudyingSemester) {
    const subject = await this.subjectRepository.getOrCreate(pair.name ?? '');
    const name = DISCIPLINE_TYPE[pair.tag] ?? DISCIPLINE_TYPE.Лек;
    const role = TEACHER_TYPE[pair.tag] ?? TEACHER_TYPE.Лек;

    const week = pair.week;
    const day = pair.day;
    const { startDate: startOfSemester } = await this.dateService.getSemester(period);
    const [startHours, startMinutes] = pair.time
      .split(':')
      .map((s: string) => parseInt(s));
    const MINUTES_AFTER_HOUR = 35;
    const startOfEvent = new Date(startOfSemester.getTime()+week*WEEK+(day-1)*DAY+startHours*HOUR+startMinutes*MINUTE);
    const endOfEvent = new Date(startOfEvent.getTime()+HOUR+MINUTES_AFTER_HOUR*MINUTE);

    let discipline = await this.disciplineRepository.getOrCreate({
      subjectId: subject.id,
      groupId,
      year: period.year,
      semester: period.semester,
    });

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

    pair.teacher = pair.teacher ? pair.teacher : { lastName: '', firstName: '', middleName: '' };
    const teachers = pair.teachers ?? [pair.teacher];
    for (const { lastName, firstName, middleName } of teachers) {
      const teacher = await this.teacherService.getTeacherFullInitials(lastName, firstName, middleName);

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
        eventsAmount: await this.getEventsAmount(Period.EVERY_FORTNIGHT),
        groupId: groupId,
        lessons: {
          create: {
            disciplineTypeId: disciplineType.id,
          },
        },
      });
    } else if (
      event.startTime.getTime() === startOfEvent.getTime() - WEEK &&
      event.period === Period.EVERY_FORTNIGHT
    ) {
      await this.eventRepository.updateById(event.id, {
        period: Period.EVERY_WEEK,
        eventsAmount: await this.getEventsAmount(Period.EVERY_WEEK),
      });
    }
  }
  
  async getEventsAmount (period: Period) {
    const { startDate, endDate } = await this.dateService.getCurrentSemester();
    const lastWeek = this.dateUtils.getCeiledDifference(startDate, new Date(endDate.getTime() - FORTNITE), WEEK);
    return lastWeek / weeksPerEvent[period];
  }
}
