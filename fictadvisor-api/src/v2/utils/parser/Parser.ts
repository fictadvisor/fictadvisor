import { BaseGroup, GroupParsedSchedule } from './ScheduleParserTypes';
import { StudyingSemester } from '../date/DateService';

export interface Parser<GroupType extends BaseGroup = BaseGroup> {
  parseGroups(groupNames: string[]): Promise<GroupType[]>;
  parseGroupSchedule(
    group: GroupType,
    semester: StudyingSemester
  ): Promise<GroupParsedSchedule>;
}
