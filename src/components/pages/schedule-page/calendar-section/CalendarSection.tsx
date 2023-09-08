import type { FC } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Box, Stack } from '@mui/material';

import Button from '@/components/common/ui/button-mui/Button';
import {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import { GroupsDropDown } from '@/components/pages/schedule-page/calendar-section/components/groups-dropdown/GroupsDropDown';
import useAuthentication from '@/hooks/use-authentication';
import { useSchedule } from '@/store/schedule/useSchedule';
import { Group } from '@/types/group';
import { UserGroupRole } from '@/types/user';

import { CheckBoxSection } from './components/checkboxes-section/CheckBoxSection';
import { DatePicker } from './components/date-picker/DatePicker';
import * as styles from './CalendarSection.styles';

export interface CalendarSectionProps {
  groups: Group[];
}
export const CalendarSection: FC<CalendarSectionProps> = ({ groups }) => {
  const { user } = useAuthentication();
  const groupId = useSchedule(state => state.groupId);

  const validPrivilege =
    user &&
    (user.group?.role === UserGroupRole.CAPTAIN ||
      user.group?.role === UserGroupRole.MODERATOR);

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
