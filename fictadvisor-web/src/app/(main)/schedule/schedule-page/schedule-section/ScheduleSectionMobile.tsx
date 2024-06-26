import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import moment from 'moment';

import { EventsResponse } from '@/lib/api/schedule/types/EventsResponse';
import { transformEvents } from '@/lib/api/schedule/utils/transformEvents';
import { useSchedule } from '@/store/schedule/useSchedule';

import ScheduleColumn from './components/schedule/components/schedule-column';
import * as styles from './ScheduleSection.styles';

const ScheduleSectionMobile = () => {
  const { events, week, disciplines, loading, currentTime } = useSchedule(
    state => ({
      events: state.eventsBody,
      week: state.week,
      disciplines: state.eventTypes,
      loading: state.isLoading,
      currentTime: state.currentTime,
    }),
  );
  const dayMapper = ['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];

  const eventsPerWeek = useMemo(() => {
    if (!events[week - 1]) return null;
    const _eventsWeek: EventsResponse = JSON.parse(
      JSON.stringify(events[week - 1]),
    );
    _eventsWeek.events = _eventsWeek.events.filter(event => {
      return disciplines.some(discipline => discipline === event.eventType);
    });
    return _eventsWeek;
  }, [disciplines, events, week]);

  return (
    <Box>
      <Box sx={styles.scheduleSectionMobile}>
        {eventsPerWeek && (
          <Box sx={styles.events}>
            {transformEvents(eventsPerWeek).days.map((day, index) => (
              <Box sx={styles.event} key={index}>
                <Box sx={styles.eventDate}>
                  <Typography sx={styles.day}>
                    {dayMapper[day.day.getDay()]}
                  </Typography>
                  <Typography
                    sx={styles.date(
                      currentTime.date() === moment(day.day).date() &&
                        currentTime.month() === moment(day.day).month(),
                    )}
                  >
                    {day.day.getDate()}
                  </Typography>
                </Box>
                {day.events.length === 0 ? (
                  <Typography sx={styles.noEvents}>
                    В цей день немає подій
                  </Typography>
                ) : (
                  <ScheduleColumn day={day} />
                )}
              </Box>
            ))}
          </Box>
        )}

        {loading && (
          <>
            {dayMapper.map((_, i) => (
              <Box key={i} sx={styles.skeleton}>
                <Skeleton
                  width={38}
                  height={38}
                  variant={'rounded'}
                  sx={{ bgcolor: 'grey.200' }}
                  animation="wave"
                />
                <Skeleton
                  width={'100%'}
                  height={80}
                  variant={'rounded'}
                  sx={{ bgcolor: 'grey.200' }}
                  animation="wave"
                />
              </Box>
            ))}
          </>
        )}
      </Box>
    </Box>
  );
};

export default ScheduleSectionMobile;
