import { DisciplineTypeEnum } from '@prisma/client/fictadvisor';

export type ScheduleDayNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type ScheduleWeekNumber = 0 | 1;

export class ParsedScheduleTeacher {
  lastName: string;
  firstName: string;
  middleName: string;
}

export class ParsedDisciplineType {
  name: DisciplineTypeEnum;
  id?: string;
}

export class ParsedSchedulePair {
  name: string;
  startTime: Date;
  endTime: Date;
  isSelective: boolean;
  disciplineType: ParsedDisciplineType;
  teachers: ParsedScheduleTeacher[];
}

export class ParsedScheduleWeek {
  pairs: ParsedSchedulePair[] = [];
  constructor (public weekNumber: ScheduleWeekNumber) {};
}

export class BaseGroup {
  name: string;
}

export class GroupParsedSchedule {
  name: string;
  firstWeek: ParsedScheduleWeek;
  secondWeek: ParsedScheduleWeek;
}
