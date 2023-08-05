import type { ExtendedContractBody } from '@/lib/api/contract/types/ContractBody';

export const saveLocalStorage = (data: ExtendedContractBody | null) => {
  if (data && 'helper' in data) {
    data.helper.secretNumber = '';
  }

  localStorage.setItem('contractData', JSON.stringify(data));
};

export const getLocalStorage = (): ExtendedContractBody | null => {
  const data = localStorage.getItem('contractData');

  if (data) return JSON.parse(data);

  return null;
};
