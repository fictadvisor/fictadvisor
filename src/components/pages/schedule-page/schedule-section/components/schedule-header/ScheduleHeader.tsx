import React, { useEffect, useMemo, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Box, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

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
  const [prevButton, setPrevButton] = useState(false);
  const [nextButton, setNextButton] = useState(false);

  const updateWeek = (amount: number) => {
    const newWeek = week + amount;
    setChosenDay(getLastDayOfAWeek(semester as GetCurrentSemester, newWeek));
  };

  useEffect(() => {
    week === 1 ? setPrevButton(true) : setPrevButton(false);
    week === 20 ? setNextButton(true) : setNextButton(false);
  }, [week]);

  const monthNumber = useMemo(() => {
    if (!eventsBody[week - 1]) return null;
    return transformEvents(
      eventsBody[week - 1] as GetEventBody,
    ).days[0].day.getMonth();
  }, [eventsBody, week]);

  const days = useMemo(() => {
    if (!eventsBody[week - 1]) return [];
    return transformEvents(eventsBody[week - 1] as GetEventBody).days;
  }, [eventsBody, week]);

  const handleClick = () => {
    if (new Date(semester?.endDate as string).getTime() > currentTime.getTime())
      setChosenDay(currentTime);
    else setChosenDay(new Date(semester?.endDate as string));
  };

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.date}>
        {monthNumber && (
          <Typography sx={styles.month}>{monthMapper[monthNumber]}</Typography>
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
        <Box sx={styles.weekWrapper}>
          <IconButton
            disabled={prevButton}
            sx={styles.button}
            size={IconButtonSize.LARGE}
            shape={IconButtonShape.SQUARE}
            color={IconButtonColor.TRANSPARENT}
            icon={<ChevronLeftIcon />}
            onClick={() => updateWeek(-1)}
          />

          <Typography sx={styles.week}>{week} тиждень</Typography>

          <IconButton
            disabled={nextButton}
            sx={styles.button}
            size={IconButtonSize.LARGE}
            shape={IconButtonShape.SQUARE}
            color={IconButtonColor.TRANSPARENT}
            icon={<ChevronRightIcon />}
            onClick={() => updateWeek(1)}
          />
          {currentTime.toDateString() !== chosenDay?.toDateString() && (
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
                  ? days[i].day.toDateString() === currentTime?.toDateString()
                  : false,
              )}
            >
              {dayName}
            </Typography>
            {days[i] && (
              <Typography
                sx={styles.dayNumber(
                  days[i]
                    ? days[i].day.toDateString() === currentTime?.toDateString()
                    : false,
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
