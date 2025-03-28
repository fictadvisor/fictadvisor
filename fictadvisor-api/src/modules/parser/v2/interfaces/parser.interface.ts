import { BaseGroup, GroupParsedSchedule } from '../types/schedule-parser.types';
import { StudyingSemester } from '../../../date/v2/date.service';

export interface Parser<GroupType extends BaseGroup = BaseGroup> {
  parseGroups(groupNames: string[]): Promise<GroupType[]>;
  parseGroupSchedule(
    group: GroupType,
    semester: StudyingSemester
  ): Promise<GroupParsedSchedule>;
}
