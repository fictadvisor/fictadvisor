import {
  ExtendedPriorityData,
  PartialBy,
  PriorityData,
} from '@/lib/api/contract/types/ContractBody';
export const prepareData = (intialData: ExtendedPriorityData): PriorityData => {
  delete (intialData as PartialBy<ExtendedPriorityData, 'secretNumber'>)
    .secretNumber;

  delete (intialData as PartialBy<ExtendedPriorityData, 'noMiddleName'>)
    .noMiddleName;

  if (intialData.specialty === '121') intialData.priorities['3'] = undefined;

  return replaceApostrophes(intialData);
};

const replaceApostrophes = (initialData: PriorityData) => {
  return JSON.parse(JSON.stringify(initialData).replaceAll(/[`'’‘“”*]/g, '`'));
};
