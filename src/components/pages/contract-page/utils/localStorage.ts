import type { ExtendedContractBody } from '@/lib/api/contract/types/ContractBody';

export const saveLocalStorage = (data: ExtendedContractBody | null) => {
  if (data && 'helper' in data) {
    data.helper.secretNumber = '';
    data.helper.forcePushedNumber = '';
  }

  localStorage.setItem('contractData', JSON.stringify(data));
};

export const getLocalStorage = (): ExtendedContractBody | null => {
  const data = localStorage.getItem('contractData');

  if (data) {
    const parsedData: ExtendedContractBody = JSON.parse(data);
    parsedData.meta.isForcePushed = !!parsedData.meta.isForcePushed;
    return parsedData;
  }

  return null;
};
