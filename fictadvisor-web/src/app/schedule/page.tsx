import { Metadata } from 'next';

import SchedulePage from '@/components/pages/schedule-page/SchedulePage';
import DatesAPI from '@/lib/api/dates/DatesAPI';
import GroupAPI from '@/lib/api/group/GroupAPI';
import scheduleMetadata from '@/lib/metadata/schedule';
import { Group } from '@/types/group';

export const metadata: Metadata = scheduleMetadata;

export const dynamic = 'force-dynamic';
export default async function SchedulePageWrapper() {
  let groups: Group[] = [];
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
