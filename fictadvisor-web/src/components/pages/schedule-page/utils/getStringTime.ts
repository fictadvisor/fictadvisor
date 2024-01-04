/**
 * @param time - time in ISOString format
 */
import dayjs from 'dayjs';

export const getStringTime = (time: string) => {
  const date = dayjs(time).tz();
  return date.format('HH:mm');
};
