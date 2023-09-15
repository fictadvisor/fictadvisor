import { FC, useEffect, useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import dayjs from 'dayjs';

import { calculateScheduleLineTop } from '@/components/pages/schedule-page/schedule-section/components/schedule/components/schedule-column/components/schedule-card/utils/calculateScheduleLineTop';
import ScheduleLine from '@/components/pages/schedule-page/schedule-section/components/schedule/components/schedule-line';
import { ScheduleLineVariant } from '@/components/pages/schedule-page/schedule-section/components/schedule/components/schedule-line/types';
import { getStringTime } from '@/components/pages/schedule-page/utils/getStringTime';
import { useSchedule } from '@/store/schedule/useSchedule';
import theme from '@/styles/theme';
import { Event } from '@/types/schedule';

import ScheduleEvent from './cards/ScheduleEvent';
import ScheduleEvents from './cards/ScheduleEvents';
import { ScheduleEventsSection } from './components/schedule-events-section/ScheduleEventsSection';
import calculateHeight from './utils/calculateHeight';
import { calculateTop } from './utils/calculateTop';
import * as styles from './ScheduleCard.styles';

interface ScheduleCardProps {
  event: Event | Event[];
  onClick: (event: Event, week: string) => void;
  week: string;
}

const ScheduleCard: FC<ScheduleCardProps> = ({ event, onClick, week }) => {
  const currentTime = useSchedule(state => state.currentTime);
  const [top, setTop] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [areEventsOpen, setEventsOpen] = useState(false);
  const [isPastEvent, setIsPastEvent] = useState(false);
  const [lineTop, setLineTop] = useState(0);
  const [isCurEvent, setIsCurEvent] = useState(false);

  useEffect(() => {
    const _event = Array.isArray(event) ? event[0] : event;
    setTop(calculateTop(_event.startTime));
    setHeight(calculateHeight(_event.startTime, _event.endTime));
    setStart(getStringTime(_event.startTime));
    setEnd(getStringTime(_event.endTime));
    setIsPastEvent(currentTime.valueOf() >= dayjs(_event.endTime).valueOf());
    setLineTop(
      calculateScheduleLineTop(
        _event.startTime,
        _event.endTime,
        currentTime.toISOString(),
      ),
    );
    setIsCurEvent(
      currentTime.valueOf() >= dayjs(_event.startTime).valueOf() &&
        currentTime.valueOf() <= dayjs(_event.endTime).valueOf(),
    );
  }, [currentTime, event]);

  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));

  return (
    <Box sx={styles.wrapper(top, height, areEventsOpen ? 1 : 0)}>
      {Array.isArray(event) ? (
        areEventsOpen ? (
          <ScheduleEventsSection
            week={week}
            onClick={onClick}
            onOutsideClick={() => setEventsOpen(false)}
            events={event}
            isPastEvent={isPastEvent}
          />
        ) : (
          <ScheduleEvents
            events={event}
            height={height}
            start={start}
            end={end}
            isPastEvent={isPastEvent}
            onClick={() => setEventsOpen(true)}
          />
        )
      ) : (
        <ScheduleEvent
          event={event}
          height={height}
          start={start}
          end={end}
          onClick={onClick}
          week={week}
          isPastEvent={isPastEvent}
        />
      )}
      {isMobile && isCurEvent && (
        <ScheduleLine
          variant={ScheduleLineVariant.LONG}
          dashed={false}
          top={lineTop}
        />
      )}
    </Box>
  );
};

export default ScheduleCard;
