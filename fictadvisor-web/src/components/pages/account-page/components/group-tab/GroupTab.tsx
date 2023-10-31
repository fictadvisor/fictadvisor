import React, { FC } from 'react';
import { useQuery } from 'react-query';
import { Box, Typography } from '@mui/material';

import Progress from '@/components/common/ui/progress';
import NoGroupBlock from '@/components/pages/account-page/components/group-tab/components/no-group-block';
import RequestsTable from '@/components/pages/account-page/components/group-tab/components/table/requests-table';
import StudentsTable from '@/components/pages/account-page/components/group-tab/components/table/student-table';
import {
  transformRequestsData,
  transformStudentsData,
} from '@/components/pages/account-page/components/group-tab/components/table/utils';
import useAuthentication from '@/hooks/use-authentication';
import GroupAPI from '@/lib/api/group/GroupAPI';
import PermissionService from '@/lib/services/permisson/PermissionService';
import { PERMISSION, PermissionData } from '@/lib/services/permisson/types';
import { PendingStudent } from '@/types/student';
import { User, UserGroupState } from '@/types/user';

import * as styles from './GroupTab.styles';

const getGroupData = async (user: User) => {
  const groupId = user.group?.id as string;
  const permissionValues: PermissionData = {
    groupId: groupId,
  };
  const permissions = await PermissionService.getPermissionList(
    user.id,
    permissionValues,
  );
  const { students } = await GroupAPI.getGroupStudents(groupId);
  const requests: PendingStudent[] = !permissions[
    PERMISSION.GROUPS_$GROUPID_STUDENTS_UNVERIFIED_GET
  ]
    ? []
    : (await GroupAPI.getRequestStudents(groupId)).students;

  return {
    students,
    requests,
    permissions,
  };
};

const GroupTab: FC = () => {
  const { user } = useAuthentication();
  const { data, isLoading, refetch } = useQuery(
    ['students'],
    () => getGroupData(user),
    {
      retry: false,
      refetchOnWindowFocus: false,
    },
  );
  const showRequests =
    data?.requests?.length !== 0 &&
    data?.permissions[PERMISSION.GROUPS_$GROUPID_STUDENTS_UNVERIFIED_GET];

  if (isLoading)
    return (
      <Box sx={styles.progress}>
        <Progress />
      </Box>
    );

  if (
    user?.group?.state === UserGroupState.DECLINED ||
    user?.group?.state === UserGroupState.PENDING
  )
    return <NoGroupBlock />;

  if (!data || !user?.group || !user?.group.role) return null;
  return (
    <>
      <Box>
        <Typography sx={styles.group} variant="h4">
          Список групи {user.group.code}
        </Typography>
      </Box>
      {showRequests && (
        <RequestsTable
          refetch={refetch}
          rows={transformRequestsData(data.requests)}
        />
      )}
      {
        <StudentsTable
          refetch={refetch}
          permissions={data.permissions}
          role={user.group.role}
          rows={transformStudentsData(data.students)}
        />
      }
    </>
  );
};

export default GroupTab;
