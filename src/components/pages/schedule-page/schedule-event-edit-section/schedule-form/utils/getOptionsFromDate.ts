import { DropDownOption } from '@/components/common/ui/form/dropdown/types';

import { getStringTime } from '../../../utils/getStringTime';
const MinuteMs = 1000 * 60;
const HourMs = MinuteMs * 60;

export const getOptionsFromDate = (date: Date) => {
  const startOfDayMs = new Date(date.toDateString()).getTime();

  const startStudyTime = HourMs * 7 + startOfDayMs;
  const endStudyTime = HourMs * 23.5 + startOfDayMs;

  const differenceBetweenOptions = MinuteMs * 5;

  let studyTime = startStudyTime;
  const optionsArray: DropDownOption[] = [];

  while (studyTime <= endStudyTime) {
    const ISOStringTime = new Date(studyTime).toISOString();
    optionsArray.push({
      id: ISOStringTime,
      label: getStringTime(ISOStringTime),
    });
    studyTime += differenceBetweenOptions;
  }

  return optionsArray;
};
