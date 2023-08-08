import type { DeleteEntrantBody } from '@/lib/api/contract/types/DeleteEntrantBody';

export const saveLocalStorage = (data: DeleteEntrantBody | null) => {
  localStorage.setItem('deleteEntrantData', JSON.stringify(data));
};

export const getLocalStorage = (): DeleteEntrantBody | null => {
  const data = localStorage.getItem('deleteEntrantData');

  if (data) return JSON.parse(data);

  return null;
};
