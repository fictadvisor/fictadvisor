import React, { Dispatch, FC, SetStateAction } from 'react';
import { useRef } from 'react';
import { Box } from '@mui/material';
import { Form, Formik, FormikProps } from 'formik';

import Button from '@/components/common/ui/button-mui';
import Divider from '@/components/common/ui/divider';
import { DividerTextAlign } from '@/components/common/ui/divider/types';
import { Input } from '@/components/common/ui/form';
import { FieldSize } from '@/components/common/ui/form/common/types';
import FormikDropdown from '@/components/common/ui/form/with-formik/dropdown';
import { SPECIALITIES } from '@/components/pages/contract-admin-page/constants';
import useTabClose from '@/hooks/use-tab-close';
import useToast from '@/hooks/use-toast';
import ContractAPI from '@/lib/api/contract/ContractAPI';
import { EntrantFuIlResponse } from '@/lib/api/contract/types/EntrantFullResponse';
import getErrorMessage from '@/lib/utils/getErrorMessage';
import { EntrantBody } from '@/types/contract';

import * as styles from '../../EntrantDashboardPage.styles';
import { getLocalStorage, saveLocalStorage } from '../../utils/localStorage';

import { initialValues } from './constants';
import { validationSchema } from './validation';

interface EntrantSearchFormProps {
  setEntrantData: Dispatch<SetStateAction<EntrantFuIlResponse | null>>;
}

const errorMapper = {
  DataNotFoundException: 'Даних про вступника не було знайдено у базі даних',
  UnauthorizedException: 'Ви не зареєстровані',
  NoPermissionException: 'У вас не має доступу до цього ресурсу',
};
const EntrantSearchForm: FC<EntrantSearchFormProps> = ({ setEntrantData }) => {
  const toast = useToast();
  const handleSubmit = async (values: EntrantBody) => {
    try {
      if (values.middleName?.trim().length === 0) {
        values.middleName = undefined;
      }
      const data = await ContractAPI.getEntrantInfo(values);
      setEntrantData(data);
      saveLocalStorage(values);
      console.log(data);
    } catch (error) {
      const message = getErrorMessage(error);
      message
        ? toast.error(message)
        : toast.error('Щось пішло не так, спробуй пізніше!');
      // const error = (
      //   e as { response: { data: { error: keyof typeof errorMapper } } }
      // ).response.data.error;
      //
      // toast.error(errorMapper[error]);
    }
  };

  const form = useRef<FormikProps<EntrantBody>>(null);

  useTabClose(() => {
    saveLocalStorage(form?.current?.values ?? null);
  });

  return (
    <Formik
      innerRef={form}
      initialValues={getLocalStorage() || initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {() => (
        <Form
          style={{
            gap: '40px',
            paddingBottom: '50px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box sx={styles.form}>
            <Divider
              sx={{ marginBottom: '12px' }}
              textAlign={DividerTextAlign.LEFT}
              text="Дані про вступника"
            />
            <Input name="lastName" placeholder="Шевченко" label="Прізвище" />
            <Input name="firstName" placeholder="Тарас" label="Ім'я" />
            <Input
              name="middleName"
              placeholder={'Григорович'}
              label={`По-батькові`}
            />
            <FormikDropdown
              size={FieldSize.LARGE}
              options={SPECIALITIES}
              label="Спеціальність"
              name="specialty"
              placeholder="виберіть зі списку"
            />
            <Button sx={styles.button} text="Знайти" type="submit" />
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default EntrantSearchForm;
