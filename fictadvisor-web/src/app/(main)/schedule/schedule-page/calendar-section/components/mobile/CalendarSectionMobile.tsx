import type { FC } from 'react';
import { MappedGroupResponse } from '@fictadvisor/utils/responses';
import { Box } from '@mui/material';

import { GroupsDropDown } from '@/app/(main)/schedule/schedule-page/calendar-section/components/groups-dropdown/GroupsDropDown';
import { CheckboxesDropdown } from '@/app/(main)/schedule/schedule-page/calendar-section/components/mobile/checkboxes-dropdown/CheckboxesDropDown';

import { CheckBoxSection } from '../checkboxes-section/CheckBoxSection';

import { WeekArrows } from './weekArrows/WeekArrows';
import * as styles from './CalendarSectionMobile.styles';
export interface CalendarSectionMobileProps {
  groups: MappedGroupResponse[];
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
