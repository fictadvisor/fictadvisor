import { DeleteEntrantBody } from '@/lib/api/contract/types/DeleteEntrantBody';
import { PartialBy } from '@/lib/api/contract/types/utils';
export const prepareData = (
  intialData: DeleteEntrantBody,
): DeleteEntrantBody => {
  const data = trimObject(replaceApostrophes(intialData));

  if (data.middleName.length === 0)
    delete (data as PartialBy<DeleteEntrantBody, 'middleName'>).middleName;

  console.log(data);

  return data;
};

const replaceApostrophes = (initialData: DeleteEntrantBody) => {
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
