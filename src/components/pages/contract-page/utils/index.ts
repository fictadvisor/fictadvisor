import { kyiv } from '@/components/pages/contract-page/constants';
import {
  ContractBody,
  ExtendedContractBody,
  PartialBy,
} from '@/lib/api/contract/types/ContractBody';

export const prepareData = (
  initialData: ExtendedContractBody,
): ContractBody => {
  delete (initialData as PartialBy<ExtendedContractBody, 'helper'>).helper;

  if (initialData.entrant.middleName?.length === 0)
    initialData.entrant.middleName = undefined;
  if (initialData.entrant.idCode?.length === 0)
    initialData.entrant.idCode = undefined;
  if (initialData.entrant.passportSeries?.length === 0)
    initialData.entrant.passportSeries = undefined;

  if (initialData.representative.middleName?.length === 0)
    initialData.representative.middleName = undefined;
  if (initialData.representative.idCode?.length === 0)
    initialData.representative.idCode = undefined;
  if (initialData.representative.passportSeries?.length === 0)
    initialData.representative.passportSeries = undefined;
  if (initialData.representative.email?.length === 0)
    initialData.representative.email = undefined;

  if (initialData.meta.paymentType?.length === 0)
    initialData.meta.paymentType = undefined;

  if (initialData.entrant.region === kyiv) {
    initialData.entrant.settlement = kyiv;
    initialData.entrant.region = undefined;
  }

  if (initialData.representative.region === kyiv) {
    initialData.representative.settlement = kyiv;
    initialData.representative.region = undefined;
  }

  console.log(initialData);
  return replaceApostrophes(initialData);
};

const replaceApostrophes = (initialData: ContractBody) => {
  return JSON.parse(JSON.stringify(initialData).replaceAll(/[`'’‘“”*]/g, '`'));
};
