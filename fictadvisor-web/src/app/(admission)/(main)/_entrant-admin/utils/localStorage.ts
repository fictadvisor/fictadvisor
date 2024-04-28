import { DeleteEntrantDataQueryDTO } from '@fictadvisor/utils/requests';

export const saveLocalStorage = (data: DeleteEntrantDataQueryDTO | null) => {
  localStorage.setItem('deleteEntrantData', JSON.stringify(data));
};

export const getLocalStorage = (): DeleteEntrantDataQueryDTO | null => {
  const data = localStorage.getItem('deleteEntrantData');

  if (data) return JSON.parse(data);

  return null;
};
