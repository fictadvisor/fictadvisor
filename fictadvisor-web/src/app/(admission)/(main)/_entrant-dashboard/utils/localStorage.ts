import { FullNameWithSpecialtyDTO } from '@fictadvisor/utils/requests';

export const saveLocalStorage = (data: FullNameWithSpecialtyDTO | null) => {
  localStorage.setItem('entrantAdminPageData', JSON.stringify(data));
};

export const getLocalStorage = (): FullNameWithSpecialtyDTO | null => {
  const data = localStorage.getItem('entrantAdminPageData');

  let parsedData;
  if (data) {
    parsedData = JSON.parse(data);
    return parsedData as FullNameWithSpecialtyDTO;
  }

  return null;
};
