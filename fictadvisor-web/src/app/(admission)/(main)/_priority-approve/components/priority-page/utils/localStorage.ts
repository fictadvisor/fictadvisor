import { ExtendedPriorityDataBody } from '@/lib/api/contract/types/PriorityDataBody';

export const saveLocalStorage = (data: ExtendedPriorityDataBody | null) => {
  if (data && 'secretNumber' in data) data.secretNumber = '';
  if (data && 'forcePushedNumber' in data) data.forcePushedNumber = '';

  localStorage.setItem('priorityData', JSON.stringify(data));
};

export const getLocalStorage = (): ExtendedPriorityDataBody | null => {
  const data = localStorage.getItem('priorityData');

  if (data) {
    //to fix [] in local storage
    const parsedData = JSON.parse(data) as ExtendedPriorityDataBody;
    parsedData.isForcePushed = !!parsedData.isForcePushed;
    return parsedData;
  }

  return null;
};
