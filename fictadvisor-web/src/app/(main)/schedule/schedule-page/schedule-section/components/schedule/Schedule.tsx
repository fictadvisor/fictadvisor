import { useEffect, useMemo } from 'react';
import { Box } from '@mui/material';

import ScheduleColumn from '@/app/(main)/schedule/schedule-page/schedule-section/components/schedule/components/schedule-column/ScheduleColumn';
import { ScheduleLineVariant } from '@/app/(main)/schedule/schedule-page/schedule-section/components/schedule/components/schedule-line/types';
import ScheduleTime from '@/app/(main)/schedule/schedule-page/schedule-section/components/schedule/components/schedule-time';
import { areDatesInSameWeek } from '@/app/(main)/schedule/schedule-page/utils/areDatesInSameWeek';
import Progress from '@/components/common/ui/progress';
import { useAuthentication } from '@/hooks/use-authentication/useAuthentication';
import { EventsResponse } from '@/lib/api/schedule/types/EventsResponse';
import { transformEvents } from '@/lib/api/schedule/utils/transformEvents';
import { useSchedule } from '@/store/schedule/useSchedule';

import { calculateTop } from './components/schedule-column/components/schedule-card/utils/calculateTop';
import ScheduleLine from './components/schedule-line/ScheduleLine';
import * as styles from './Schedule.styles';

const Schedule = () => {
  const { user } = useAuthentication();
  const {
    events,
    checkboxes,
    week,
    disciplines,
    loading,
    currentTime,
    updateCheckboxes,
  } = useSchedule(state => ({
    events: state.eventsBody,
    checkboxes: state.checkboxes,
    week: state.week,
    disciplines: state.eventTypes,
    loading: state.isLoading,
    currentTime: state.currentTime.toISOString(),
    updateCheckboxes: state.updateCheckboxes,
  }));

  const eventsPerWeek = useMemo(() => {
    if (!events[week - 1]) return null;
    const _eventsWeek: EventsResponse = JSON.parse(
      JSON.stringify(events[week - 1]),
    );

    _eventsWeek.events = _eventsWeek.events.filter(event =>
      disciplines.some(discipline => discipline === event.eventType),
    );

    return _eventsWeek;
  }, [disciplines, events, week]);

  useEffect(() => {
    updateCheckboxes({
      ...checkboxes,
      isSelective: !!user,
    });
  }, [user]);

  const eventsTime = eventsPerWeek?.startTime;

  const isCurWeek = eventsTime
    ? areDatesInSameWeek(eventsTime as unknown as string, currentTime)
    : false;

  const top = calculateTop(currentTime);
  return (
    <Box sx={styles.layout}>
      <ScheduleTime />
      <Box sx={styles.schedule}>
        {eventsPerWeek && (
          <Box sx={styles.columns}>
            {transformEvents(eventsPerWeek)
              .days.reverse()
              .map((day, index) => {
                return <ScheduleColumn key={index} day={day} />;
              })}
            {isCurWeek && (
              <ScheduleLine
                variant={ScheduleLineVariant.SHORT}
                dashed={true}
                top={top}
              />
            )}
          </Box>
        )}
        {loading && <Progress sx={styles.progress} />}
      </Box>
    </Box>
  );
};

export default Schedule;
