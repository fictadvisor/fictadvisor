import { MappedGroupResponse } from '@fictadvisor/utils/responses';
import SchedulePage from 'src/app/(main)/schedule/schedule-page';

import DatesAPI from '@/lib/api/dates/DatesAPI';
import GroupAPI from '@/lib/api/group/GroupAPI';

export const dynamic = 'force-dynamic';

export default async function SchedulePageWrapper() {
  let groups: MappedGroupResponse[] = [];
  let semester = null;
  try {
    const [semestersData, groupData] = await Promise.all([
      DatesAPI.getCurrentSemester(),
      GroupAPI.getAll(),
    ]);
    groups = groupData.groups;
    semester = semestersData;
  } catch (error) {
    groups = [];
    semester = null;
  }

  return <SchedulePage groups={groups} semester={semester} />;
}
