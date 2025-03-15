import axios from 'axios';
import { JSDOM } from 'jsdom';
import { Injectable } from '@nestjs/common';
import { Parser } from './interfaces/parser.interface';
import { DateService } from '../date/date.service';
import { DisciplineTypeEnum } from '@fictadvisor/utils/enums';
import { SemesterDate } from '@prisma/client/fictadvisor';
import { GeneralParser } from './general-parser';
import {
  BaseGroup,
  GroupParsedSchedule,
  ScheduleDayNumber,
  ParsedSchedulePair,
  ParsedScheduleWeek,
  ScheduleWeekNumber,
} from './types/schedule-parser-types';
import {
  DOMAIN_EXTRACTION_REGEX,
  EVENTVALIDATION,
  GOOGLE_MAPS_URL,
  GROUP_CODE_REGEX,
  GROUP_SELECTION_URL,
  SCHEDULE_GROUP_SELECTION_URL,
  SCHEDULE_SELECTION_FORM_SELECTOR,
  VIEW_SCHEDULE_PARAMS,
  VIEW_SCHEDULE_URL_BASE,
  WEEK_TAGS,
} from './constants/roz-params';

const ROZ_PARSER_DISCIPLINE_TYPE = {
  'Лек': DisciplineTypeEnum.LECTURE,
  'Прак': DisciplineTypeEnum.PRACTICE,
  'Лаб': DisciplineTypeEnum.LABORATORY,
  'Ісп': DisciplineTypeEnum.EXAM,
  'Зал': DisciplineTypeEnum.EXAM,
};

@Injectable()
export class RozParser implements Parser {
  constructor (private dateService: DateService) {}

  async parseGroups (groupNames: string[] = []): Promise<BaseGroup[]> {
    const groupSelectionCount = 10;

    const { data } = await axios.post(GROUP_SELECTION_URL, {
      count: groupSelectionCount,
      prefixText: 'і',
    });

    const filtered: BaseGroup[] = data.d
      .filter((name: string) => GROUP_CODE_REGEX.test(name) && !name.endsWith('ф'))
      .map((name: string) => ({ name }));

    return groupNames.length
      ? filtered.filter(({ name }) => groupNames.includes(name))
      : filtered;
  }

  async parseGroupSchedule (
    { name }: BaseGroup,
    semester: SemesterDate
  ): Promise<GroupParsedSchedule> {
    const groupHashId = await this.getGroupHashId(name);
    const url = `${VIEW_SCHEDULE_URL_BASE}${groupHashId}`;

    VIEW_SCHEDULE_PARAMS.set(
      'ctl00$MainContent$ddlSemesterType',
      semester.semester + ''
    );

    const { data } = await axios.post(url, VIEW_SCHEDULE_PARAMS);
    const dom = new JSDOM(data);

    await new Promise((res) => setTimeout(res, 3000));

    return {
      name,
      firstWeek: await this.parseWeek(semester, 0, dom),
      secondWeek: await this.parseWeek(semester, 1, dom),
    };
  }

  private async getGroupHashId (group: string) {
    const SCHEDULE_GROUP_SELECTION_PARAMS = new URLSearchParams({
      __EVENTVALIDATION: EVENTVALIDATION,
      __EVENTTARGET: '',
      ctl00$MainContent$ctl00$txtboxGroup: group,
      ctl00$MainContent$ctl00$btnShowSchedule: 'Розклад занять',
    });

    const response = await axios.post(
      SCHEDULE_GROUP_SELECTION_URL,
      SCHEDULE_GROUP_SELECTION_PARAMS
    );

    const dom = new JSDOM(response.data);
    const form = dom.window.document.querySelector(SCHEDULE_SELECTION_FORM_SELECTOR);
    return form.getAttribute('action').split('?g=')[1];
  }

  private async parseWeek (
    semester: SemesterDate,
    weekNumber: ScheduleWeekNumber,
    dom: JSDOM
  ): Promise<ParsedScheduleWeek> {
    const result = new ParsedScheduleWeek(weekNumber);
    const table = dom.window.document.getElementById(
      WEEK_TAGS[weekNumber]
    ) as HTMLTableElement;

    for (const row of table.rows) {
      if (row.rowIndex === 0) continue;

      const time = (row.childNodes[1] as HTMLElement).innerHTML.split('<br>')[1];

      for (let j = 2; j < row.childNodes.length; j++) {
        const td = row.childNodes[j] as HTMLElement;
        if (td.innerHTML === '' || td.innerHTML === undefined) continue;

        const dayNumber = (j - 1) as ScheduleDayNumber;
        const pairType = td.lastChild.textContent.split(' ')[1] as keyof typeof ROZ_PARSER_DISCIPLINE_TYPE;
        const span = td.childNodes[0];

        const tableCellPairs: ParsedSchedulePair[] = [];
        this.parseTableCellDisciplines(
          span,
          tableCellPairs,
          pairType,
          {
            semester,
            weekNumber,
            dayNumber,
            time,
          },
          dom
        );
        this.parseTableCellTeachers(td, tableCellPairs, dom);

        result.pairs.push(...tableCellPairs);
      }
    }

    this.findSelective(result.pairs);
    return result;
  }

  private findSelective (pairs: ParsedSchedulePair[]) {
    for (const pair of pairs) {
      pair.isSelective = pairs.some(
        ({ name, startTime }) =>
          pair.name !== name && pair.startTime.getTime() === startTime.getTime()
      );
    }
  }

  private parseHtmlTeacherString = (node: ChildNode[], index: number) => {
    const teacherAnchor = node[index] as HTMLAnchorElement;
    return teacherAnchor.getAttribute('title');
  };

  private parseTableCellTeachers (
    td: HTMLElement,
    tableCellPairs: ParsedSchedulePair[],
    dom: JSDOM
  ) {
    let linksCounter = 0;
    const teacherLinks = Object.values(td.childNodes).filter(
      (node: any) =>
        !(
          [
            dom.window.HTMLBRElement,
            dom.window.Text,
            dom.window.HTMLSpanElement,
          ].some((excludedElement) => node instanceof excludedElement) ||
          node.href.match(DOMAIN_EXTRACTION_REGEX)?.includes(GOOGLE_MAPS_URL)
        )
    );

    for (let k = 0; k < teacherLinks.length; k++) {
      const mainTeacherString = this.parseHtmlTeacherString(teacherLinks, k);

      if (
        teacherLinks.length > tableCellPairs.length &&
        k === teacherLinks.length - 1 - 1
      ) {
        const secondaryTeacherString = this.parseHtmlTeacherString(
          teacherLinks,
          k + 1);

        tableCellPairs[linksCounter].teachers =
          GeneralParser.parseTeacherNames(mainTeacherString, secondaryTeacherString);

        k += 1;
        continue;
      }
      tableCellPairs[linksCounter].teachers =
        GeneralParser.parseTeacherNames(mainTeacherString);

      linksCounter += 1;
    }
  }

  private parseTableCellDisciplines (
    span: ChildNode,
    tableCellPairs: Omit<ParsedSchedulePair, 'isSelective'>[],
    pairType: keyof typeof ROZ_PARSER_DISCIPLINE_TYPE,
    {
      semester,
      weekNumber,
      dayNumber,
      time,
    }: {
      semester: SemesterDate;
      weekNumber: ScheduleWeekNumber;
      dayNumber: ScheduleDayNumber;
      time: string;
    },
    dom: JSDOM
  ) {
    for (const childNode of span.childNodes) {
      if (childNode instanceof dom.window.Text) continue;

      const { startOfEvent: startTime, endOfEvent: endTime } =
        this.dateService.getParserEventTime(
          semester.startDate,
          weekNumber,
          dayNumber,
          time
        );

      tableCellPairs.push({
        name: childNode.textContent,
        startTime,
        endTime,
        teachers: [],
        disciplineType: {
          name:
            ROZ_PARSER_DISCIPLINE_TYPE[pairType] ??
            ROZ_PARSER_DISCIPLINE_TYPE['Лек'],
        },
      });
    }
  }
}
