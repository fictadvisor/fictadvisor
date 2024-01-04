import dayjs from 'dayjs';

export const calculateTop = (startTime: string): number => {
  if (startTime) {
    const date = dayjs(startTime).tz();
    const minutes = date.hour() * 60 + date.minute() - 7 * 60;
    return (minutes / 60) * 84 + 4;
  }
  return 0;
};
