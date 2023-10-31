import type { FC } from 'react';
import { useQuery } from 'react-query';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Box, Stack } from '@mui/material';

import Button from '@/components/common/ui/button-mui/Button';
import {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import { GroupsDropDown } from '@/components/pages/schedule-page/calendar-section/components/groups-dropdown/GroupsDropDown';
import useAuthentication from '@/hooks/use-authentication';
import PermissionService from '@/lib/services/permisson/PermissionService';
import { PERMISSION, PermissionData } from '@/lib/services/permisson/types';
import { useSchedule } from '@/store/schedule/useSchedule';
import { Group } from '@/types/group';

import { CheckBoxSection } from './components/checkboxes-section/CheckBoxSection';
import { DatePicker } from './components/date-picker/DatePicker';
import * as styles from './CalendarSection.styles';

export interface CalendarSectionProps {
  groups: Group[];
}
export const CalendarSection: FC<CalendarSectionProps> = ({ groups }) => {
  const { user } = useAuthentication();
  const groupId = useSchedule(state => state.groupId);

  const permissionValues: PermissionData = {
    groupId: user.group?.id,
  };

  const { data } = useQuery(
    [],
    () => PermissionService.getPermissionList(user.id, permissionValues),
    {
      retry: false,
      refetchOnWindowFocus: false,
    },
  );

  const validPrivilege = data?.[PERMISSION.GROUPS_$GROUPID_EVENTS_CREATE];

  const showButton = validPrivilege && user.group?.id === groupId;

  return (
    <Box sx={styles.mainWrapper}>
      <Box sx={styles.sticky}>
        <Stack sx={styles.wrapper}>
          {showButton && (
            <Button
              text="Додати подію"
              variant={ButtonVariant.OUTLINE}
              sx={{ borderRadius: '8px', p: '8px' }}
              startIcon={<PlusIcon />}
              size={ButtonSize.MEDIUM}
              onClick={() =>
                useSchedule.setState(state => ({
                  isNewEventAdded: true,
                  openedEvent: undefined,
                }))
              }
            />
          )}

          <GroupsDropDown groups={groups} />
          <DatePicker />
          <CheckBoxSection />
        </Stack>
      </Box>
    </Box>
  );
};
