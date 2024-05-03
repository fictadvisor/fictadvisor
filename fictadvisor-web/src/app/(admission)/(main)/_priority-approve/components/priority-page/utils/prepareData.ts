import {
  ExtendedPriorityDataBody,
  PriorityDataBody,
} from '@/lib/api/contract/types/PriorityDataBody';
import { PartialBy } from '@/types/utils/PartialBy';

export const prepareData = (
  intialData: ExtendedPriorityDataBody,
): PriorityDataBody => {
  delete (intialData as PartialBy<ExtendedPriorityDataBody, 'secretNumber'>)
    .secretNumber;

  delete (
    intialData as PartialBy<ExtendedPriorityDataBody, 'forcePushedNumber'>
  ).forcePushedNumber;

  delete (intialData as PartialBy<ExtendedPriorityDataBody, 'noMiddleName'>)
    .noMiddleName;

  if (intialData?.middleName?.length === 0)
    delete (intialData as PartialBy<ExtendedPriorityDataBody, 'middleName'>)
      .middleName;

  if (intialData.specialty === '121') intialData.priorities['3'] = undefined;

  const data = trimObject(replaceApostrophes(intialData));

  return data;
};

const replaceApostrophes = (initialData: PriorityDataBody) => {
  return JSON.parse(JSON.stringify(initialData).replaceAll(/[`'’‘“”*]/g, '`'));
};

const trimObject = <T extends object>(originalObj: T): T => {
  const obj: T = { ...originalObj };

  const entries = window.Object.entries(obj).map(item => {
    if (typeof item[1] === 'string') item[1] = item[1].trim();
    return item;
  });

  return window.Object.fromEntries(entries) as T;
};
