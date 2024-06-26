import React, { FC, SetStateAction, useState } from 'react';
import { Box } from '@mui/material';

import { initialValues } from '@/app/(admission)/_contract/constants';
import { getLocalStorage } from '@/app/(admission)/_contract/utils/localStorage';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import ContractAPI from '@/lib/api/contract/ContractAPI';
import { ExtendedContractBody } from '@/lib/api/contract/types/ContractBody';

import { prepareData } from '../../utils/prepareData';
import { PassFormAgain } from '../PassFormAgain';
import { FirstStep } from '../steps/FirstStep';
import { FourthStep } from '../steps/FourthStep';
import { SecondStep } from '../steps/SecondStep';
import { ThirdStep } from '../steps/ThirdStep';

import { formWrapper } from './PersonalForm.styles';
export const PersonalForm: FC<{
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
}> = ({ setIsLoading }) => {
  const { displayError } = useToastError();
  const localStorageValues = getLocalStorage();
  const toast = useToast();
  const [data, setData] = useState(localStorageValues || initialValues);
  const [step, setStep] = useState(0);
  const [isForcePushed, setIsForcePushed] = useState(
    !!localStorageValues?.meta.isForcePushed,
  );
  const [submitted, setSubmitted] = useState(false);
  const [isAdult, setIsAdult] = useState(!!localStorageValues?.helper.isAdult);
  const [hasCustomer, setHasCustomer] = useState(
    !!localStorageValues?.helper.hasCustomer,
  );

  const handleNextStep = async (data: ExtendedContractBody, final = false) => {
    if (!final) setData(prevState => ({ ...prevState, ...data }));

    if (final) {
      setIsLoading(true);
      try {
        await ContractAPI.createContract(
          prepareData(JSON.parse(JSON.stringify(data))),
        );

        setData(prevState => ({ ...prevState, ...data }));
        setSubmitted(true);

        toast.success(
          `Ти успішно надіслав контракт, перевір пошту ${data.entrant.email}`,
        );
      } catch (error) {
        displayError(error);
      }
      setIsLoading(false);
      return;
    }

    setStep(pr => pr + 1);
  };

  const handlePrevStep = (data: ExtendedContractBody) => {
    setData(prevState => ({ ...prevState, ...data }));
    setStep(pr => pr - 1);
  };

  //TODO:
  // [] make middleName required, when "I don't have a middle name" checkbox is checked
  // [] make password series required, when one of either checkboxes is checked

  const steps = [
    <FirstStep
      setHasCustomer={setHasCustomer}
      setIsAdult={setIsAdult}
      onNextStep={handleNextStep}
      data={data}
      setIsForcePushed={setIsForcePushed}
      key={1}
    />,
    <SecondStep
      onNextStep={handleNextStep}
      onPrevStep={handlePrevStep}
      data={data}
      isForcePushed={isForcePushed}
      key={2}
    />,
  ];

  if (!isAdult)
    steps.push(
      <ThirdStep
        onNextStep={handleNextStep}
        onPrevStep={handlePrevStep}
        data={data}
        isForcePushed={isForcePushed}
        key={3}
      />,
    );

  if (hasCustomer)
    steps.push(
      <FourthStep
        data={data}
        isForcePushed={isForcePushed}
        onNextStep={handleNextStep}
        onPrevStep={handlePrevStep}
      />,
    );

  return (
    <Box sx={formWrapper}>{!submitted ? steps[step] : <PassFormAgain />}</Box>
  );
};
