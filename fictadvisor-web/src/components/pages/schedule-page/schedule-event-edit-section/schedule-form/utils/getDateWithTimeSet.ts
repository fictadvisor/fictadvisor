import { Moment } from 'moment';

export function getDateWithTimeSet(date: Moment, time: string) {
  return (
    date.format('YYYY-MM-DDTHH:mm:ssZ[Z]').toString().substring(0, 11) +
    time.substring(11)
  );
}
