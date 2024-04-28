import { DeleteEntrantDataQueryDTO } from '@fictadvisor/utils/requests';

import { PartialBy } from '@/types/utils/PartialBy';

export const prepareData = (
  intialData: DeleteEntrantDataQueryDTO,
): DeleteEntrantDataQueryDTO => {
  const data = trimObject(replaceApostrophes(intialData));

  if (data.middleName.length === 0)
    delete (data as PartialBy<DeleteEntrantDataQueryDTO, 'middleName'>)
      .middleName;

  return data;
};

const replaceApostrophes = (initialData: DeleteEntrantDataQueryDTO) => {
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
