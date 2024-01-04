import { FC, Fragment } from 'react';
import { Box, Button, Typography } from '@mui/material';

import mergeSx from '@/lib/utils/MergeSxStylesUtil';
import { Event } from '@/types/schedule';

import * as styles from './Cards.styles';

interface ScheduleEventsProps {
  events: Event[];
  height: number;
  start: string;
  end: string;
  isPastEvent: boolean;
  onClick: () => void;
}

const ScheduleEvent: FC<ScheduleEventsProps> = ({
  events,
  height,
  start,
  end,
  isPastEvent,
  onClick,
}) => {
  const trimmedEvents = events.slice(0, 5);

  return (
    <Box sx={styles.wrapper} onClick={onClick}>
      {trimmedEvents.map((event, index) => {
        const eventHeight = height - 14 * index;
        const width = index * 10;
        const top = 14 * index;
        const left = 10 * index - 2;
        return (
          <Button
            key={event.id}
            sx={mergeSx(
              styles.card(
                event.disciplineType ? event.disciplineType.name : null,
                eventHeight,
                'unset',
                isPastEvent,
              ),
              styles.packedCard(top, width, left),
            )}
            disableRipple
          >
            {index === trimmedEvents.length - 1 && (
              <Fragment>
                <Typography variant="body1">
                  {events.length} {events.length < 5 ? 'події' : 'подій'}
                </Typography>
                {eventHeight > 42 && (
                  <Typography variant="body2" sx={styles.time}>
                    {start} - {end}
                  </Typography>
                )}
              </Fragment>
            )}
          </Button>
        );
      })}
    </Box>
  );
};

export default ScheduleEvent;
