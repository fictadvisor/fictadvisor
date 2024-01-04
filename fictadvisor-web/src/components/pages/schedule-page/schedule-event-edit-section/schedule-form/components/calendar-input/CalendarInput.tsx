import { Dispatch, FC } from 'react';
import { CalendarIcon as CalendarIconMUI } from '@heroicons/react/24/outline';
import { Box } from '@mui/material';
import { ukUA } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

import { useSchedule } from '@/store/schedule/useSchedule';

import * as styles from './CalendarInput.styles';

const ukrainianLocale =
  ukUA.components.MuiLocalizationProvider.defaultProps.localeText;

ukrainianLocale.fieldDayPlaceholder = () => 'ДД';
ukrainianLocale.fieldYearPlaceholder = params => 'Р'.repeat(params.digitAmount);

interface CalendarInputProps {
  date: Dayjs | null;
  setDate: Dispatch<Dayjs | null>;
}
const CalendarIcon = () => {
  return <CalendarIconMUI height={24} width={24} />;
};

const CalendarInput: FC<CalendarInputProps> = ({ date, setDate }) => {
  const semester = useSchedule(state => state.semester);
  return (
    <Box sx={styles.wrapper}>
      <DatePicker
        slotProps={{
          textField: { sx: styles.input },
          popper: { sx: styles.calendar },
        }}
        slots={{ openPickerIcon: CalendarIcon }}
        sx={styles.datePicker}
        value={dayjs(date).tz()}
        onChange={value => setDate(value && value.valueOf() > 0 ? value : null)}
        minDate={dayjs(semester?.startDate).tz()}
        maxDate={dayjs(semester?.endDate).tz()}
        localeText={ukrainianLocale}
        dayOfWeekFormatter={day => {
          return day.charAt(0).toUpperCase() + day.slice(1);
        }}
        closeOnSelect
        desktopModeMediaQuery="@media (min-width: 0px)"
      />
    </Box>
  );
};

export default CalendarInput;
