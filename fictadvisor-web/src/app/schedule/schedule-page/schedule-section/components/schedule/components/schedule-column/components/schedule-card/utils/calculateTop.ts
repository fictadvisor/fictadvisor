import moment from 'moment';
export const calculateTop = (startTime: string): number => {
  if (startTime) {
    const date = moment(startTime);
    const minutes = date.hour() * 60 + date.minute() - 7 * 60;
    return (minutes / 60) * 84 + 4;
  }
  return 0;
};
