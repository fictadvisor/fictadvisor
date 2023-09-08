import React, { useMemo } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Box, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import dayjs from 'dayjs';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import {
  IconButtonColor,
  IconButtonShape,
} from '@/components/common/ui/icon-button';
import IconButton from '@/components/common/ui/icon-button-mui';
import { IconButtonSize } from '@/components/common/ui/icon-button-mui/types';
import { MAX_WEEK_NUMBER } from '@/components/pages/schedule-page/constants';
import { GetCurrentSemester } from '@/lib/api/dates/types/GetCurrentSemester';
import { GetEventBody } from '@/lib/api/schedule/types/GetEventBody';
import { transformEvents } from '@/lib/api/schedule/utils/transformEvents';
import { useSchedule } from '@/store/schedule/useSchedule';
import { getLastDayOfAWeek } from '@/store/schedule/utils/getLastDayOfAWeek';

import * as styles from './ScheduleHeader.styles';

const dayMapper = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];
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

const ScheduleHeader = () => {
  const {
    week,
    eventsBody,
    setChosenDay,
    semester,
    chosenDay,
    currentTime,
    loading,
  } = useSchedule(state => ({
    week: state.week,
    setChosenDay: state.setChosenDay,
    eventsBody: state.eventsBody,
    semester: state.semester,
    chosenDay: state.chosenDay,
    currentTime: state.currentTime,
    loading: state.isLoading,
  }));

  const updateWeek = (amount: number) => {
    const newWeek = week + amount;
    if (newWeek < 1 || newWeek > MAX_WEEK_NUMBER) return;

    setChosenDay(getLastDayOfAWeek(semester as GetCurrentSemester, newWeek));
  };

  const month = useMemo(() => {
    if (!eventsBody[week - 1]) return null;
    return monthMapper[
      transformEvents(
        eventsBody[week - 1] as GetEventBody,
      ).days[0].day.getMonth()
    ];
  }, [eventsBody, week]);

  const days = useMemo(() => {
    if (!eventsBody[week - 1]) return [];
    return transformEvents(eventsBody[week - 1] as GetEventBody).days;
  }, [eventsBody, week]);

  const handleClick = () => {
    if (
      dayjs(semester?.endDate as string)
        .tz()
        .valueOf() > currentTime.valueOf()
    )
      setChosenDay(currentTime);
    else setChosenDay(dayjs(semester?.endDate as string).tz());
  };

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.date}>
        {month && <Typography sx={styles.month}>{month}</Typography>}
        {loading && (
          <Skeleton
            width={140}
            height={35}
            variant={'rounded'}
            sx={{ bgcolor: 'grey.200' }}
            animation="wave"
          />
        )}
        <Box sx={styles.weekWrapper}>
          <IconButton
            disabled={week === 1}
            sx={styles.button}
            size={IconButtonSize.LARGE}
            shape={IconButtonShape.SQUARE}
            color={IconButtonColor.TRANSPARENT}
            icon={<ChevronLeftIcon />}
            onClick={() => updateWeek(-1)}
          />

          <Typography sx={styles.week}>{week} тиждень</Typography>

          <IconButton
            disabled={week === MAX_WEEK_NUMBER}
            sx={styles.button}
            size={IconButtonSize.LARGE}
            shape={IconButtonShape.SQUARE}
            color={IconButtonColor.TRANSPARENT}
            icon={<ChevronRightIcon />}
            onClick={() => updateWeek(1)}
          />
          {currentTime.toString() !== chosenDay?.toString() && (
            <Button
              text={'Сьогодні'}
              sx={{ width: 'min-content' }}
              variant={ButtonVariant.OUTLINE}
              color={ButtonColor.SECONDARY}
              size={ButtonSize.SMALL}
              onClick={handleClick}
            />
          )}
        </Box>
      </Box>
      <Box sx={styles.columns}>
        {dayMapper.map((dayName, i) => (
          <Box sx={styles.column} key={i}>
            <Typography
              sx={styles.dayName(
                days[i]
                  ? dayjs(days[i].day).date() === currentTime?.date()
                  : false,
              )}
            >
              {dayName}
            </Typography>
            {days[i] && (
              <Typography
                sx={styles.dayNumber(
                  dayjs(days[i].day).tz().date() === currentTime?.date(),
                  dayjs(days[i].day).tz().date() === chosenDay?.date(),
                )}
              >
                {days[i].day.getDate()}
              </Typography>
            )}
            {loading && (
              <Skeleton
                width={20}
                height={25}
                variant={'rounded'}
                sx={{ bgcolor: 'grey.200' }}
                animation="wave"
              />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ScheduleHeader;
