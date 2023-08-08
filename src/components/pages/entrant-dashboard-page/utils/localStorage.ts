import { Fullname } from '@/types/contract';

export const saveLocalStorage = (data: Fullname | null) => {
  localStorage.setItem('entrantAdminPageData', JSON.stringify(data));
};

export const getLocalStorage = (): Fullname | null => {
  const data = localStorage.getItem('entrantAdminPageData');

  let parsedData;
  if (data) {
    parsedData = JSON.parse(data);
    return parsedData as Fullname;
  }

  return null;
};
