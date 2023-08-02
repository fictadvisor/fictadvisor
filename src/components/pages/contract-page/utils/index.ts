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
    initialData.entrant.middleName = undefined;
  if (initialData.representative.idCode?.length === 0)
    initialData.entrant.idCode = undefined;
  if (initialData.representative.passportSeries?.length === 0)
    initialData.entrant.passportSeries = undefined;

  if (initialData.meta.paymentType?.length === 0)
    initialData.meta.paymentType = undefined;

  return initialData;
};
