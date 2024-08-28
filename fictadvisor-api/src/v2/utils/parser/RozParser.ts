import axios from 'axios';
import { JSDOM } from 'jsdom';
import { Injectable } from '@nestjs/common';
import { Parser } from './Parser';
import { DisciplineTypeEnum } from '@prisma/client';
import { DisciplineTeacherRepository } from '../../database/repositories/DisciplineTeacherRepository';
import { DisciplineTeacherRoleRepository } from '../../database/repositories/DisciplineTeacherRoleRepository';
import { GroupRepository } from '../../database/repositories/GroupRepository';
import { DisciplineRepository } from '../../database/repositories/DisciplineRepository';
import { SubjectRepository } from '../../database/repositories/SubjectRepository';
import { DateService, StudyingSemester } from '../date/DateService';
import {
  DOMAIN_EXTRACTION_REGEX,
  GOOGLE_MAPS_URL,
  GROUP_CODE_REGEX,
  GROUP_SELECTION_URL,
  EVENTVALIDATION,
  SCHEDULE_GROUP_SELECTION_URL,
  SCHEDULE_SELECTION_FORM_SELECTOR,
  VIEW_SCHEDULE_PARAMS,
  VIEW_SCHEDULE_URL_BASE,
  WEEK_TAGS,
} from './RozParams';
import { ExtendedSchedulePair } from './ScheduleParserTypes';
import { DbDiscipline } from '../../database/entities/DbDiscipline';
import { DbDisciplineType } from '../../database/entities/DbDisciplineType';
import { GeneralParser } from './GeneralParser';

const DISCIPLINE_TYPE = {
  Лек: DisciplineTypeEnum.LECTURE,
  Прак: DisciplineTypeEnum.PRACTICE,
  Лаб: DisciplineTypeEnum.LABORATORY,
};

@Injectable()
export class RozParser implements Parser {
  constructor (
    private groupRepository: GroupRepository,
    private generalParser: GeneralParser,
    private subjectRepository: SubjectRepository,
    private disciplineRepository: DisciplineRepository,
    private disciplineTeacherRepository: DisciplineTeacherRepository,
    private disciplineTeacherRoleRepository: DisciplineTeacherRoleRepository,
    private dateService: DateService,
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
    const SCHEDULE_GROUP_SELECTION_PARAMS = new URLSearchParams({
      __EVENTVALIDATION: EVENTVALIDATION,
      __EVENTTARGET: '',
      ctl00$MainContent$ctl00$txtboxGroup: group,
      ctl00$MainContent$ctl00$btnShowSchedule: 'Розклад занять',
    });
    const response = await axios.post(SCHEDULE_GROUP_SELECTION_URL, SCHEDULE_GROUP_SELECTION_PARAMS);
    const dom = new JSDOM(response.data);

    const form = dom.window.document.querySelector(SCHEDULE_SELECTION_FORM_SELECTOR);
    return form.getAttribute('action').split('?g=')[1];
  }

  async parseHtmlWeek (week: number, group: string, dom: JSDOM) {
    const pairs = [];
    const table = dom.window.document.getElementById(WEEK_TAGS[week]) as HTMLTableElement;

    for (let i = 1; i < table.rows.length; i++) {
      const row = table.rows[i];

      const time = (row.childNodes[1] as HTMLElement).innerHTML.split('<br>')[1];

      for (let j = 2; j < row.childNodes.length; j++) {
        const td = row.childNodes[j] as HTMLElement;

        if (td.innerHTML === '' || td.innerHTML === undefined) continue;

        const day = j - 1;

        const localRowPairs = [];

        const pairType = td.lastChild.textContent.split(' ')[1];
        const span = td.childNodes[0];

        this.parseDisciplineLinks(span, pairType, day, week, time, group, localRowPairs, dom);

        this.parseTeacherLinks(td, localRowPairs, dom);

        pairs.push(...localRowPairs);
      }
    }

    return pairs;
  }

  parseTeacherLinks (td: HTMLElement, localRowPairs: any[], dom: JSDOM) {
    let linksCounter = 0;
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

      if (teacherLinks.length > localRowPairs.length && k === teacherLinks.length - 1 - 1) {
        const nextAnchor = teacherLinks[k + 1] as HTMLAnchorElement;
        const mainTeacher = parseTeacherName(teacherString);
        const secondaryTeacher = parseTeacherName(nextAnchor.getAttribute('title').split(' '));
        localRowPairs[linksCounter].teachers = [mainTeacher, secondaryTeacher];
        k += 1;
        continue;
      }
      localRowPairs[linksCounter].teacher = parseTeacherName(teacherString);
      linksCounter += 1;
    }
  }

  parseDisciplineLinks (
    span: ChildNode,
    pairType: string,
    day: number,
    week: number,
    time: string,
    group: string,
    localRowPairs: any[],
    dom: JSDOM,
  ) {
    let spanLinksCounter = 0;

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
  }

  async parsePair (pair: ExtendedSchedulePair, groupId: string, period: StudyingSemester) {
    const subject = await this.subjectRepository.getOrCreate(pair.name ?? '');
    const name = DISCIPLINE_TYPE[pair.tag] ?? DISCIPLINE_TYPE.Лек;

    const { startDate: startOfSemester } = await this.dateService.getSemester(period);
    const { startOfEvent, endOfEvent } = this.dateService.getEventTimeRozKpi(startOfSemester, pair.week, pair.day, pair.time);

    const discipline = await this.ensureDisciplineType(subject.id, groupId, period.year, period.semester, name);

    const disciplineType = discipline.disciplineTypes.find((type) => type.name === name);

    await this.handleTeachers(pair, discipline, disciplineType);

    await this.generalParser.handleEvent(pair, startOfEvent, endOfEvent, groupId, disciplineType.id);
  }

  async ensureDisciplineType (
    subjectId: string,
    groupId: string,
    year: number,
    semester: number,
    typeName: DisciplineTypeEnum,
  ) {
    let discipline = await this.disciplineRepository.getOrCreate({
      subjectId,
      groupId,
      year,
      semester,
    });

    if (!discipline.disciplineTypes.some((type) => type.name === typeName)) {
      discipline = await this.disciplineRepository.updateById(discipline.id, {
        disciplineTypes: {
          create: {
            name: typeName,
          },
        },
      });
    }

    return discipline;
  }

  async handleTeachers (
    pair: ExtendedSchedulePair,
    discipline: DbDiscipline,
    disciplineType: DbDisciplineType,
  ) {
    pair.teacher = pair.teacher ? pair.teacher : { lastName: '', firstName: '', middleName: '' };
    const teachers = pair.teachers ?? [pair.teacher];

    for (const { lastName, firstName, middleName } of teachers) {
      const teacher = await this.generalParser.getTeacherFullInitials(lastName, firstName, middleName);

      const disciplineTeacher = await this.disciplineTeacherRepository.getOrCreate({
        teacherId: teacher.id,
        disciplineId: discipline.id,
      });

      await this.disciplineTeacherRoleRepository.getOrCreate({
        disciplineTeacherId: disciplineTeacher.id,
        disciplineTypeId: disciplineType.id,
      });
    }
  }
}
