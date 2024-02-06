/**
 * @param time - time in ISOString format
 */
import moment from 'moment';

export const getStringTime = (time: string) => {
  const date = moment(time);
  return date.format('HH:mm');
};
