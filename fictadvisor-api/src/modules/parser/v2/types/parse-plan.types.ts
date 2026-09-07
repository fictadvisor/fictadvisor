import { ParserTypeEnum } from '@fictadvisor/utils/enums';
import { BaseGroup } from './schedule-parser.types';

// Everything one group's import needs beyond the group itself, in a shape that survives
// JSON -- a queue job carries one of these. The semester is named rather than embedded
// because a SemesterDate carries Date objects, and dates come back out of Redis as
// strings; the worker looks it up again, off the cache the date service already keeps.
export interface ParsePlanContext {
  parserType: ParserTypeEnum;
  weekNumber: number;
  semesterStartDate: string;
  year: number;
  semester: number;
}

// The result of the shared prologue: the same context plus the groups to fan out over.
export interface ParsePlan extends ParsePlanContext {
  groups: BaseGroup[];
}

export interface ParseGroupJobData extends ParsePlanContext {
  group: BaseGroup;
}
