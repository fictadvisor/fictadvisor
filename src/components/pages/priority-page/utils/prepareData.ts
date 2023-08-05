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

  if (intialData.middleName.length === 0)
    delete (intialData as PartialBy<ExtendedPriorityData, 'middleName'>)
      .middleName;

  if (intialData.specialty === '121') intialData.priorities['3'] = undefined;

  const data = trimObject(replaceApostrophes(intialData));

  console.log(data);

  return data;
};

const replaceApostrophes = (initialData: PriorityData) => {
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
