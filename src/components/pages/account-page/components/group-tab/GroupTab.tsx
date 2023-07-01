import { FC } from 'react';
import { useQuery } from 'react-query';
import { useMediaQuery } from '@mui/material';
import MobileRequestsTable from 'src/components/pages/account-page/components/group-tab/components/table/mobile-requests-table';
import MobileStudentsTable from 'src/components/pages/account-page/components/group-tab/components/table/mobile-students-table';
import RequestsTable from 'src/components/pages/account-page/components/group-tab/components/table/requests-table';
import {
  transformRequestsData,
  transformStudentsData,
} from 'src/components/pages/account-page/components/group-tab/components/table/utils';

import Loader, { LoaderSize } from '@/components/common/ui/loader';
import NoGroupBlock from '@/components/pages/account-page/components/group-tab/components/no-group-block';
import StudentsTable from '@/components/pages/account-page/components/group-tab/components/table/student-table';
import useAuthentication from '@/hooks/use-authentication';
import GroupAPI from '@/lib/api/group/GroupAPI';
import theme from '@/styles/theme';
import { PendingStudent } from '@/types/student';
import { User, UserGroupRole } from '@/types/user';

import styles from './GroupTab.module.scss';

const getStudents = async (user: User) => {
  const { students } = await GroupAPI.getGroupStudents(
    user.group?.id as string,
  );
  let requests: PendingStudent[] = [];

  if (user.group?.role !== UserGroupRole.STUDENT) {
    const { students: pendingStudents } = await GroupAPI.getRequestStudents(
      user.group?.id as string,
    );

    requests = pendingStudents;
  }

  return {
    students,
    requests,
  };
};

const GroupTab: FC = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('desktop'));
  const { user } = useAuthentication();

  const { data, isLoading, refetch } = useQuery(
    ['students'],
    () => getStudents(user),
    {
      retry: false,
      refetchOnWindowFocus: false,
    },
  );

  if (isLoading) return <Loader size={LoaderSize.SMALLEST} />;

  if (!data) return null;

  if (!user?.group?.role) return <NoGroupBlock />;

  const showRequests =
    data?.requests?.length !== 0 && user?.group?.role !== UserGroupRole.STUDENT;

  return (
    <div className={styles['content']}>
      <div className={styles['text-content']}>
        <h4>Список групи {user.group.code}</h4>
      </div>
      {showRequests &&
        (isMobile ? (
          <MobileRequestsTable
            refetch={refetch}
            rows={transformRequestsData(data?.requests)}
          />
        ) : (
          <RequestsTable
            refetch={refetch}
            rows={transformRequestsData(data.requests)}
          />
        ))}
      {isMobile ? (
        <MobileStudentsTable
          refetch={refetch}
          role={user.group.role}
          rows={transformStudentsData(data.students)}
        />
      ) : (
        <StudentsTable
          refetch={refetch}
          role={user.group.role}
          rows={transformStudentsData(data.students)}
        />
      )}
    </div>
  );
};

export default GroupTab;
