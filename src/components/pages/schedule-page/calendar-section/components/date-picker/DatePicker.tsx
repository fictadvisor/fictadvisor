import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';

import { useSchedule } from '@/store/schedule/useSchedule';

import * as styles from './DatePicker.styles';

export const DatePicker = () => {
  const { chosenDay, setChosenDay, semester } = useSchedule(state => ({
    chosenDay: state.chosenDay,
    setChosenDay: state.setChosenDay,
    semester: state.semester,
  }));

  if (!chosenDay) return <></>;

  return (
    <DateCalendar
      value={dayjs(chosenDay)}
      onChange={newValue => {
        if (newValue && semester) {
          console.log(newValue.toDate());
          setChosenDay(newValue);
        }
      }}
      sx={styles.picker}
      views={['day']}
      showDaysOutsideCurrentMonth
      dayOfWeekFormatter={day => {
        return day.charAt(0).toUpperCase() + day.slice(1);
      }}
      minDate={dayjs(semester?.startDate)}
      maxDate={dayjs(semester?.endDate)}
    />
  );
};
