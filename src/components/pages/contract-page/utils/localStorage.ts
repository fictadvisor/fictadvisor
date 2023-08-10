import { initialValues } from '@/components/pages/contract-page/constants';
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
    const parsedData = JSON.parse(data);
    parsedData.meta.isForcePushed = !!parsedData.meta.isForcePushed;
    parsedData.helper.hasCustomer = !!parsedData.helper.hasCustomer;

    console.log(compareNestedKeys(parsedData, initialValues as never));
    console.log(parsedData, initialValues);

    if (compareNestedKeys(parsedData, initialValues as never))
      return parsedData as ExtendedContractBody;
  }

  return null;
};

function compareNestedKeys(
  obj1: Record<string, never>,
  obj2: Record<string, never>,
): boolean {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!keys2.includes(key)) {
      return false;
    }

    const value1 = obj1[key];
    const value2 = obj2[key];

    if (typeof value1 === 'object' && typeof value2 === 'object') {
      if (!compareNestedKeys(value1, value2)) {
        return false;
      }
    }
  }

  return true;
}
