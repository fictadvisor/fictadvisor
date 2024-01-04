import type { FC } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Box, Stack } from '@mui/material';

import { GroupsDropDown } from '@/components/pages/schedule-page/calendar-section/components/groups-dropdown/GroupsDropDown';
import { CheckboxesDropdown } from '@/components/pages/schedule-page/calendar-section/components/mobile/checkboxes-dropdown/CheckboxesDropDown';
import { Group } from '@/types/group';

import { CheckBoxSection } from '../checkboxes-section/CheckBoxSection';

import { WeekArrows } from './weekArrows/WeekArrows';
import * as styles from './CalendarSectionMobile.styles';
export interface CalendarSectionMobileProps {
  groups: Group[];
}
export const CalendarSectionMobile: FC<CalendarSectionMobileProps> = ({
  groups,
}) => {
  return (
    <Box sx={styles.mainWrapper}>
      <WeekArrows />
      <GroupsDropDown groups={groups} />
      <CheckboxesDropdown />
      {/*<CheckBoxSection />*/}
    </Box>
  );
};
