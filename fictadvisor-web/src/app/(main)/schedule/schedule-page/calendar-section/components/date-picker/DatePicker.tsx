import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'moment';

import { useSchedule } from '@/store/schedule/useSchedule';

import 'moment/locale/uk';

import * as styles from './DatePicker.styles';

export const DatePicker = () => {
  const { chosenDay, setChosenDay, semester } = useSchedule(state => ({
    chosenDay: state.chosenDay,
    setChosenDay: state.setChosenDay,
    semester: state.semester,
  }));

  if (!chosenDay) return <></>;

  moment.locale('uk', {
    months: moment
      .localeData('uk')
      .months()
      .map(month => month.charAt(0).toUpperCase() + month.slice(1)),
  });

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DateCalendar
        value={moment(chosenDay)}
        onChange={newValue => {
          if (newValue && semester) {
            setChosenDay(newValue);
          }
        }}
        sx={styles.picker}
        views={['day']}
        showDaysOutsideCurrentMonth
        dayOfWeekFormatter={day => {
          return day.charAt(0).toUpperCase() + day.slice(1);
        }}
        minDate={moment(semester?.startDate)}
        maxDate={moment(semester?.endDate)}
      />
    </LocalizationProvider>
  );
};
