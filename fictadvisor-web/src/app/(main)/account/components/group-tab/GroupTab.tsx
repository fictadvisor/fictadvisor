import React, { useState } from 'react';
import { GroupRoles, State } from '@fictadvisor/utils/enums';
import { PERMISSION } from '@fictadvisor/utils/security';
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import NoGroupBlock from '@/app/(main)/account/components/group-tab/components/no-group-block';
import RequestsTable from '@/app/(main)/account/components/group-tab/components/table/requests-table';
import StudentsTable from '@/app/(main)/account/components/group-tab/components/table/student-table';
import {
  transformRequestsData,
  transformStudentsData,
} from '@/app/(main)/account/components/group-tab/components/table/utils';
import AlertButton from '@/components/common/ui/alert-button';
import { AlertButtonVariant } from '@/components/common/ui/alert-button/types';
import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import Popup from '@/components/common/ui/pop-ups/Popup';
import Progress from '@/components/common/ui/progress';
import { useAuthentication } from '@/hooks/use-authentication/useAuthentication';
import groupAPI from '@/lib/api/group/GroupAPI';
import GroupService from '@/lib/services/group/GroupService';
import { Order } from '@/lib/services/group/types/OrderEnum';
import theme from '@/styles/theme';

import * as styles from './GroupTab.styles';

const GroupTab = () => {
  const [order, setOrder] = useState(Order.ascending);
  const { user } = useAuthentication();
  const { refresh } = useRouter();

  const groupId = user?.group?.id;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['students', groupId, order],
    queryFn: () => GroupService.getGroupData(groupId!, order),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!groupId,
  });

  const [leavePopupOpen, setLeavePopupOpen] = useState(false);

  const showRequests =
    data?.requests?.length !== 0 &&
    data?.permissions[PERMISSION.GROUPS_$GROUPID_STUDENTS_UNVERIFIED_GET];

  const isMobile = useMediaQuery(theme.breakpoints.down('desktop'));

  const handleSortButtonClick = async () => {
    setOrder(
      order === GroupService.Order.ascending
        ? GroupService.Order.descending
        : GroupService.Order.ascending,
    );
    await refetch();
  };

  const handleGroupLeave = async () => {
    if (user?.group) {
      await groupAPI.leaveGroup(user.group.id);
    }
    refresh();
  };

  if (isLoading)
    return (
      <Box sx={styles.progress}>
        <Progress />
      </Box>
    );

  if (
    user?.group?.state === State.DECLINED ||
    user?.group?.state === State.PENDING
  )
    return <NoGroupBlock />;

  if (!data || !user?.group || !user?.group.role) return null;

  return (
    <>
      <Box sx={styles.groupInfo}>
        <Typography variant="h4" sx={{ marginBottom: '20px' }}>
          Список групи {user.group.code}
        </Typography>
        {!isMobile && data?.permissions[PERMISSION.GROUPS_$GROUPID_LEAVE] && (
          <Button
            text="Вийти з групи"
            variant={ButtonVariant.OUTLINE}
            color={ButtonColor.PRIMARY}
            size={ButtonSize.SMALL}
            sx={styles.leaveButton}
            onClick={() => setLeavePopupOpen(true)}
          />
        )}
      </Box>
      {showRequests && (
        <RequestsTable
          refetch={refetch}
          rows={transformRequestsData(data.requests)}
        />
      )}
      <StudentsTable
        refetch={refetch}
        permissions={data.permissions}
        role={user.group.role as keyof typeof GroupRoles}
        rows={transformStudentsData(data.students)}
        onSortButtonClick={handleSortButtonClick}
        order={order}
      />
      <Popup
        icon={<ArrowRightStartOnRectangleIcon />}
        open={leavePopupOpen}
        title="Вийти з групи"
        content="Чи дійсно ти бажаєш вийти з групи? Якщо ти випадково вийдеш з групи, тобі треба буде знов чекати на підтвердження старости для повернення або переходу"
        onClose={() => setLeavePopupOpen(false)}
        firstButton={
          <Button
            size={ButtonSize.SMALL}
            text="Відмінити"
            color={ButtonColor.PRIMARY}
            variant={ButtonVariant.TEXT}
            onClick={() => setLeavePopupOpen(false)}
          />
        }
        secondButton={
          <AlertButton
            text="Вийти"
            variant={AlertButtonVariant.ERROR_OUTLINE}
            onClick={handleGroupLeave}
          />
        }
      />
      {isMobile && data?.permissions[PERMISSION.GROUPS_$GROUPID_LEAVE] && (
        <Button
          text="Вийти з групи"
          variant={ButtonVariant.OUTLINE}
          color={ButtonColor.PRIMARY}
          size={ButtonSize.SMALL}
          sx={styles.leaveButton}
          onClick={() => setLeavePopupOpen(true)}
        />
      )}
    </>
  );
};

export default GroupTab;
