import { kyiv } from '@/components/pages/contract-page/constants';
import {
  ContractBody,
  ExtendedContractBody,
} from '@/lib/api/contract/types/ContractBody';
import { PartialBy } from '@/lib/api/contract/types/utils';
export const prepareData = (
  initialData: ExtendedContractBody,
): ContractBody => {
  delete (initialData as PartialBy<ExtendedContractBody, 'helper'>).helper;

  const data = replaceApostrophes(initialData);

  data.entrant = trimObject(data.entrant);
  data.meta = trimObject(data.meta);
  data.representative = trimObject(data.representative);

  if (data.entrant.middleName?.length === 0)
    data.entrant.middleName = undefined;
  if (data.entrant.idCode?.length === 0) data.entrant.idCode = undefined;
  if (data.entrant.passportSeries?.length === 0)
    data.entrant.passportSeries = undefined;

  if (data.representative.middleName?.length === 0)
    data.representative.middleName = undefined;
  if (data.representative.idCode?.length === 0)
    data.representative.idCode = undefined;
  if (data.representative.passportSeries?.length === 0)
    data.representative.passportSeries = undefined;
  if (data.representative.email?.length === 0)
    data.representative.email = undefined;

  if (data.meta.paymentType?.length === 0) data.meta.paymentType = undefined;

  if (data.entrant.region === kyiv) {
    data.entrant.settlement = kyiv;
    data.entrant.region = undefined;
  }

  if (data.representative.region === kyiv) {
    data.representative.settlement = kyiv;
    data.representative.region = undefined;
  }

  console.log(data);

  return data;
};

const replaceApostrophes = (initialData: ContractBody): ContractBody => {
  return JSON.parse(JSON.stringify(initialData).replaceAll(/[`'’‘“”*]/g, '`'));
};

const trimObject = <T extends object>(originalObj: T): T => {
  const obj: T = { ...originalObj };

  const entries = window.Object.entries(obj).map(item => {
    if (typeof item[1] === 'string') item[1] = item[1].trim();
    return item;
  });

  return window.Object.fromEntries(entries) as T;
};
