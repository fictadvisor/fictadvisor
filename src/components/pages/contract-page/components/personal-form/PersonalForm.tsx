import React, { FC, useState } from 'react';
import { Box } from '@mui/material';
import { AxiosError } from 'axios';

import { initialValues } from '@/components/pages/contract-page/constants';
import { getLocalStorage } from '@/components/pages/contract-page/utils/localStorage';
import useToast from '@/hooks/use-toast';
import ContractAPI from '@/lib/api/contract/ContractAPI';
import { ExtendedContractBody } from '@/lib/api/contract/types/ContractBody';

import { prepareData } from '../../utils/prepareData';
import { PassFormAgain } from '../PassFormAgain';

import { FirstStep } from './../steps/FirstStep';
import { SecondStep } from './../steps/SecondStep';
import { ThirdStep } from './../steps/ThirdStep';
import { formWrapper } from './PersonalForm.styles';

export const PersonalForm: FC = () => {
  const toast = useToast();
  const [data, setData] = useState(getLocalStorage() || initialValues);
  const [step, setStep] = useState(0);
  const [isForcePushed, setIsForcePushed] = useState(
    !!getLocalStorage()?.meta.isForcePushed,
  );
  const [submitted, setSubmitted] = useState(false);

  const handleNextStep = async (data: ExtendedContractBody, final = false) => {
    if (!final) setData(prevState => ({ ...prevState, ...data }));

    if (final) {
      try {
        await ContractAPI.createContract(
          prepareData(JSON.parse(JSON.stringify(data))),
        );
        setData(prevState => ({ ...prevState, ...data }));
        setSubmitted(true);

        toast.success(
          `Ви успішно надіслали контракт, перевірте пошту ${data.entrant.email}`,
        );
      } catch (error) {
        if ((error as AxiosError).status === 500) {
          toast.error(`Внутрішня помилка сервера`);
          return;
        }
        toast.error(
          `Трапилась помилка, перевірте усі дані та спробуйте ще раз`,
          (error as AxiosError).message,
        );
      }
      return;
    }
    setStep(pr => pr + 1);
  };

  const handlePrevStep = (data: ExtendedContractBody) => {
    setData(prevState => ({ ...prevState, ...data }));
    setStep(pr => pr - 1);
  };

  //TODO:
  // [] кнопка червона на початку, коли не заповнено нічо
  // [] make middleName required, when "I don't have a middle name" checkbox is checked
  // [] make password series required, when one of either checkboxes is checked

  const steps = [
    <FirstStep
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
    <ThirdStep
      onNextStep={handleNextStep}
      onPrevStep={handlePrevStep}
      data={data}
      isForcePushed={isForcePushed}
      key={3}
    />,
  ];

  return (
    <Box sx={formWrapper}>{!submitted ? steps[step] : <PassFormAgain />}</Box>
  );
};
