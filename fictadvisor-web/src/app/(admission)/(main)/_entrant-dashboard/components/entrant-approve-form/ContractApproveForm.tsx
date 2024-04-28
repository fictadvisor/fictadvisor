import React, { FC } from 'react';
import { CreateContractDTO } from '@fictadvisor/utils/requests';
import { EntrantFullResponse } from '@fictadvisor/utils/responses';
import { Form, Formik } from 'formik';

import Button from '@/components/common/ui/button-mui';
import { ButtonSize } from '@/components/common/ui/button-mui/types';
import { Input, InputSize } from '@/components/common/ui/form';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import contractAPI from '@/lib/api/contract/ContractAPI';

import { initialValues } from './constants';
import { validationSchema } from './validation';

const errorMapper = {
  InvalidBodyException: 'Неправильно введені дані',
  DataNotFoundException: 'Даних не було знайдено',
  UnauthorizedException: 'Ти не зареєстрований',
  NoPermissionException: 'У тебе не має доступу до цього ресурсу',
};
interface ContractApproveFormProps {
  data: EntrantFullResponse;
  setEntrantData: React.Dispatch<
    React.SetStateAction<EntrantFullResponse | null>
  >;
}

const ContractApproveForm: FC<ContractApproveFormProps> = ({
  data,
  setEntrantData,
}) => {
  const { displayError } = useToastError();
  const handleSubmit = async (values: CreateContractDTO['contract']) => {
    try {
      const body: CreateContractDTO = {
        contract: values,
        entrant: {
          firstName: data.firstName,
          middleName: data.middleName,
          lastName: data.lastName,
          specialty: data.specialty,
        },
      };
      await contractAPI.createAdminContract(body);
      setEntrantData(pr => {
        const newData = { ...pr, contract: values };
        return newData as EntrantFullResponse;
      });
    } catch (error) {
      displayError(error);
    }
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {() => (
        <Form>
          <Input
            name="number"
            placeholder="Номер договору"
            size={InputSize.LARGE}
          />
          <Input
            name="date"
            placeholder="Дата заповнення"
            size={InputSize.LARGE}
          />
          <Button
            sx={{
              width: 'fit-content',
            }}
            text="Відправити"
            type="submit"
            size={ButtonSize.SMALL}
          />
        </Form>
      )}
    </Formik>
  );
};

export default ContractApproveForm;
