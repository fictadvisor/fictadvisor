import React, { useMemo } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Box, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
const monthMapper = [
  'Січень',
  'Лютий',
  'Березень',
  'Квітень',
  'Травень',
  'Червень',
  'Липень',
  'Серпень',
  'Вересень',
  'Жовтень',
  'Листопад',
  'Грудень',
];

import {
  IconButtonColor,
  IconButtonShape,
} from '@/components/common/ui/icon-button';
import IconButton from '@/components/common/ui/icon-button-mui';
import { IconButtonSize } from '@/components/common/ui/icon-button-mui/types';
import { GetCurrentSemester } from '@/lib/api/dates/types/GetCurrentSemester';
import { GetEventBody } from '@/lib/api/schedule/types/GetEventBody';
import { transformEvents } from '@/lib/api/schedule/utils/transformEvents';
import { useSchedule } from '@/store/schedule/useSchedule';
import { getLastDayOfAWeek } from '@/store/schedule/utils/getLastDayOfAWeek';

export const WeekArrows = () => {
  const { week, setWeek, eventsBody, setChosenDay, semester, loading } =
    useSchedule(state => ({
      week: state.week,
      setWeek: state.setWeek,
      eventsBody: state.eventsBody,
      semester: state.semester,
      setChosenDay: state.setChosenDay,
      loading: state.isLoading,
    }));

  const updateWeek = (amount: number) => {
    const newWeek = week + amount;
    setWeek(newWeek);
    setChosenDay(getLastDayOfAWeek(semester as GetCurrentSemester, newWeek));
  };

  const monthNumber = useMemo(() => {
    if (!eventsBody[week - 1]) return null;
    return transformEvents(
      eventsBody[week - 1] as GetEventBody,
    ).days[0].day.getMonth();
  }, [eventsBody, week]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      {monthNumber && (
        <Typography variant={'h6Bold'}>{monthMapper[monthNumber]}</Typography>
      )}

      {loading && (
        <Skeleton
          width={140}
          height={35}
          variant={'rounded'}
          sx={{ bgcolor: 'grey.200' }}
          animation="wave"
        />
      )}

      <Box
        sx={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
        }}
      >
        <IconButton
          disabled={week === 1}
          size={IconButtonSize.LARGE}
          shape={IconButtonShape.SQUARE}
          color={IconButtonColor.TRANSPARENT}
          icon={<ChevronLeftIcon />}
          onClick={() => updateWeek(-1)}
        />

        <Typography>{week} тиждень</Typography>

        <IconButton
          disabled={week === 20}
          size={IconButtonSize.LARGE}
          shape={IconButtonShape.SQUARE}
          color={IconButtonColor.TRANSPARENT}
          icon={<ChevronRightIcon />}
          onClick={() => updateWeek(1)}
        />
      </Box>
    </Box>
  );
};
