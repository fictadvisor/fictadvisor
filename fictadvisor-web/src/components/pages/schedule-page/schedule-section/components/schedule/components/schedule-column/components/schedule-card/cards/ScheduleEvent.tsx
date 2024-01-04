import { FC } from 'react';
import { Button, Typography } from '@mui/material';

import { Event } from '@/types/schedule';

import * as styles from './Cards.styles';

interface ScheduleEventProps {
  event: Event;
  height: number | string;
  start: string;
  end: string;
  onClick: (event: Event, week: string) => void;
  minHeight?: string;
  week: string;
  isPastEvent: boolean;
}

const ScheduleEvent: FC<ScheduleEventProps> = ({
  event,
  height,
  start,
  end,
  onClick,
  minHeight = 'unset',
  week,
  isPastEvent,
}) => {
  return (
    <Button
      sx={styles.card(
        event.disciplineType ? event.disciplineType.name : null,
        height,
        minHeight,
        isPastEvent,
      )}
      disableRipple
      onClick={() => onClick(event, week)}
    >
      <Typography variant="body1">{event.name}</Typography>

      {start && end && (
        <Typography variant="body2" sx={styles.time}>
          {start} - {end}
        </Typography>
      )}
    </Button>
  );
};

export default ScheduleEvent;
