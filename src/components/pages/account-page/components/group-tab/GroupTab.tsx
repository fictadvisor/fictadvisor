import React, { FC } from 'react';
import { useQuery } from 'react-query';
import { useMediaQuery } from '@mui/material';

import Loader, { LoaderSize } from '@/components/common/ui/loader';
import NoGroupBlock from '@/components/pages/account-page/components/group-tab/components/no-group-block';
import MobileRequestTable from '@/components/pages/account-page/components/group-tab/components/table/mobile-request-table';
import MobileStudentTable from '@/components/pages/account-page/components/group-tab/components/table/mobile-student-table';
import RequestTable from '@/components/pages/account-page/components/group-tab/components/table/request-table';
import StudentTable from '@/components/pages/account-page/components/group-tab/components/table/student-table';
import {
  dataMapper,
  transformRequestsData,
  transformStudentsData,
} from '@/components/pages/account-page/components/group-tab/components/table/student-table/utils';
import useAuthentication from '@/hooks/use-authentication';
import { GroupAPI } from '@/lib/api/group/GroupAPI';
import theme from '@/styles/theme';

import styles from './GroupTab.module.scss';

const getStudents = user => {
  return async function () {
    let students, requests;
    try {
      students = (await GroupAPI.getGroupStudents(user.group.id)).students;
      requests = (await GroupAPI.getRequestStudents(user.group.id)).students;
    } finally {
      return {
        students,
        requests,
      };
    }
  };
};

const GroupTab: FC = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('desktop'));
  const { user } = useAuthentication();

  const { data, isLoading, refetch } = useQuery(
    ['students'],
    getStudents(user),
    {
      retry: false,
      refetchOnWindowFocus: false,
    },
  );

  if (isLoading) return <Loader size={LoaderSize.SMALLEST} />;

  if (!user.group.role) return <NoGroupBlock />;

  const showRequests =
    data.requests && data.requests.length !== 0 && dataMapper[user.group.role];

  return (
    <div className={styles['content']}>
      <div className={styles['text-content']}>
        <h4>Список групи {user.group.code}</h4>
      </div>
      {showRequests &&
        (isMobile ? (
          <MobileRequestTable
            refetch={refetch}
            rows={transformRequestsData(data.requests)}
          />
        ) : (
          <RequestTable
            refetch={refetch}
            rows={transformRequestsData(data.requests)}
          />
        ))}
      {isMobile ? (
        <MobileStudentTable
          refetch={refetch}
          variant={dataMapper[user.group.role]}
          rows={transformStudentsData(data.students)}
        />
      ) : (
        <StudentTable
          refetch={refetch}
          variant={dataMapper[user.group.role]}
          rows={transformStudentsData(data.students)}
        />
      )}
    </div>
  );
};

export default GroupTab;
