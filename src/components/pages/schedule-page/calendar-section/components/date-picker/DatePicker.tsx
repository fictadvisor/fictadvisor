import { FC } from 'react';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';

import { GetCurrentSemester } from '@/lib/api/dates/types/GetCurrentSemester';
import { useSchedule } from '@/store/schedule/useSchedule';
import { getWeekByDate } from '@/store/schedule/utils/getWeekByDate';

import * as styles from './DatePicker.styles';

export const DatePicker = () => {
  const { chosenDay, setChosenDay, setWeek, semester } = useSchedule(state => ({
    chosenDay: state.chosenDay,
    setChosenDay: state.setChosenDay,
    setWeek: state.setWeek,
    semester: state.semester,
  }));

  if (!chosenDay) return <></>;

  return (
    <DateCalendar
      value={dayjs(chosenDay)}
      onChange={newValue => {
        if (newValue && semester) {
          setChosenDay(newValue.toDate());
        }
      }}
      sx={styles.picker}
      views={['day']}
      showDaysOutsideCurrentMonth={true}
      dayOfWeekFormatter={day => {
        return day.charAt(0).toUpperCase() + day.slice(1);
      }}
      minDate={dayjs(semester?.startDate)}
      maxDate={dayjs(semester?.endDate)}
    />
  );
};
