import type { FC } from 'react';
import { MappedGroupResponse } from '@fictadvisor/utils/responses';
import { PERMISSION } from '@fictadvisor/utils/security';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Box, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { GroupsDropDown } from '@/app/(main)/schedule/schedule-page/calendar-section/components/groups-dropdown/GroupsDropDown';
import Button from '@/components/common/ui/button-mui/Button';
import {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import { useAuthentication } from '@/hooks/use-authentication/useAuthentication';
import PermissionApi from '@/lib/api/permission/PermissionApi';
import { useSchedule } from '@/store/schedule/useSchedule';

import { CheckBoxSection } from './components/checkboxes-section/CheckBoxSection';
import { DatePicker } from './components/date-picker/DatePicker';
import * as styles from './CalendarSection.styles';

export interface CalendarSectionProps {
  groups: MappedGroupResponse[];
}
export const CalendarSection: FC<CalendarSectionProps> = ({ groups }) => {
  const { user } = useAuthentication();

  const requiredPermissions = [PERMISSION.GROUPS_$GROUPID_EVENTS_CREATE];

  const { data: showButton } = useQuery({
    queryKey: [user?.group?.id, ...requiredPermissions],
    queryFn: () =>
      PermissionApi.check({
        permissions: [...requiredPermissions],
        values: {
          groupId: user?.group?.id,
        },
      }),
    retry: false,
    select: ({ permissions }) => {
      return requiredPermissions
        .map(permission => permissions[permission])
        .every(value => value);
    },
    refetchOnWindowFocus: false,
    enabled: !!user && !!user.group,
  });

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
