import React, { FC } from 'react';
import { Form, Formik } from 'formik';

import Button from '@/components/common/ui/button-mui';
import { ButtonSize } from '@/components/common/ui/button-mui/types';
import { Input, InputSize } from '@/components/common/ui/form';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import contractAPI from '@/lib/api/contract/ContractAPI';
import { AdminContractBody } from '@/lib/api/contract/types/AdminContractBody';
import { EntrantFuIlResponse } from '@/lib/api/contract/types/EntrantFullResponse';

import { initialValues } from './constants';
import { validationSchema } from './validation';

const errorMapper = {
  InvalidBodyException: 'Неправильно введені дані',
  DataNotFoundException: 'Даних не було знайдено',
  UnauthorizedException: 'Ви не зареєстровані',
  NoPermissionException: 'У вас не має доступу до цього ресурсу',
};
interface ContractApproveFormProps {
  data: EntrantFuIlResponse;
  setEntrantData: React.Dispatch<
    React.SetStateAction<EntrantFuIlResponse | null>
  >;
}

const ContractApproveForm: FC<ContractApproveFormProps> = ({
  data,
  setEntrantData,
}) => {
  const { displayError } = useToastError();
  const handleSubmit = async (values: AdminContractBody['contract']) => {
    try {
      const body: AdminContractBody = {
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
        return newData as unknown as EntrantFuIlResponse;
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
