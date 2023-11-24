import dayjs from 'dayjs';

export function getDateWithTimeSet(date: dayjs.Dayjs, time: string) {
  return (
    date.format('YYYY-MM-DDTHH:mm:ssZ[Z]').toString().substring(0, 11) +
    time.substring(11)
  );
}
