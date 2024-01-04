import { FC } from 'react';
import { Box, Divider, SxProps, Theme } from '@mui/material';

import Tooltip from '@/components/common/ui/tooltip';
import { getStringTime } from '@/components/pages/schedule-page/utils/getStringTime';
import mergeSx from '@/lib/utils/MergeSxStylesUtil';
import { useSchedule } from '@/store/schedule/useSchedule';

import * as styles from './ScheduleLine.styles';
import { ScheduleLineVariant } from './types';

interface ScheduleLineProps {
  variant: ScheduleLineVariant;
  dashed?: boolean;
  sx?: SxProps<Theme>;
  top: number;
}

const ScheduleLine: FC<ScheduleLineProps> = ({
  variant = ScheduleLineVariant.LONG,
  dashed = false,
  sx = {},
  top,
}) => {
  const time = useSchedule(state => state.currentTime);

  const day = (time.day() + 6) % 7;
  const indent = day * 148;

  return (
    <Box sx={mergeSx(styles.container(top), sx)}>
      {dashed && <Divider sx={styles.dashed} />}

      <Tooltip
        title={getStringTime(time.toISOString())}
        arrow
        placement={'left'}
        slotProps={{
          tooltip: { sx: styles.tooltip },
          arrow: { sx: styles.arrow },
        }}
      >
        <Box sx={styles.line(variant, indent)}>
          <Box sx={styles.verticalDivider(variant)}></Box>
          <Divider sx={styles.horizontalDivider(variant)} />
        </Box>
      </Tooltip>
    </Box>
  );
};

export default ScheduleLine;
