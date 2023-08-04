import type { ExtendedPriorityData } from '@/lib/api/contract/types/ContractBody';

export const saveLocalStorage = (data: ExtendedPriorityData | null) => {
  localStorage.setItem('priorityData', JSON.stringify(data));
};

export const getLocalStorage = (): ExtendedPriorityData | null => {
  const data = localStorage.getItem('priorityData');

  if (data) return JSON.parse(data);

  return null;
};
