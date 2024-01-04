import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import SchedulePage, {
  SchedulePageProps,
} from '@/components/pages/schedule-page/SchedulePage';
import DatesAPI from '@/lib/api/dates/DatesAPI';
import GroupAPI from '@/lib/api/group/GroupAPI';

const SchedulePageWrapper = ({
  groups,
  semester,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <SchedulePage groups={groups} semester={semester} />;
};

export const getServerSideProps: GetServerSideProps<
  SchedulePageProps
> = async context => {
  try {
    const [semestersData, groupData] = await Promise.all([
      DatesAPI.getCurrentSemester(),
      GroupAPI.getAll(),
    ]);

    return {
      props: {
        groups: groupData.groups,
        semester: semestersData,
      },
    };
  } catch (error) {
    return {
      props: {
        groups: [],
        semester: null,
      },
    };
  }
};

export default SchedulePageWrapper;
