import { EntrantBody, Fullname } from '@/types/contract';

export const saveLocalStorage = (data: Fullname | null) => {
  localStorage.setItem('entrantAdminPageData', JSON.stringify(data));
};

export const getLocalStorage = (): EntrantBody | null => {
  const data = localStorage.getItem('entrantAdminPageData');

  let parsedData;
  if (data) {
    parsedData = JSON.parse(data);
    return parsedData as EntrantBody;
  }

  return null;
};
