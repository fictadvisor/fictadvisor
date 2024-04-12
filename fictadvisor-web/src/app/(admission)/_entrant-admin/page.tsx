'use client';

import React, { useRef } from 'react';
import { Box } from '@mui/material';
import { Form, Formik, FormikProps } from 'formik';
import { useRouter } from 'next/navigation';
import {
  EntrantActionsOptions,
  initialValues,
} from 'src/app/(admission)/_entrant-admin/constants';
import { validationSchema } from 'src/app/(admission)/_entrant-admin/validation';

import * as stylesMui from '@/app/(admission)/_contract/ContractPage.styles';
import {
  getLocalStorage,
  saveLocalStorage,
} from '@/app/(admission)/_entrant-admin/utils/localStorage';
import { prepareData } from '@/app/(admission)/_entrant-admin/utils/prepareData';
import Button from '@/components/common/ui/button-mui';
import Divider from '@/components/common/ui/divider';
import { DividerTextAlign } from '@/components/common/ui/divider/types';
import { FieldSize } from '@/components/common/ui/form/common/types';
import FormikDropdown from '@/components/common/ui/form/with-formik/dropdown';
import useAuthentication from '@/hooks/use-authentication';
import useTabClose from '@/hooks/use-tab-close';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import ContractAPI from '@/lib/api/contract/ContractAPI';
import { DeleteEntrantBody } from '@/lib/api/contract/types/DeleteEntrantBody';

import Input from '../../../components/common/ui/form/input';

const EntrantAdmin = () => {
  const { isLoggedIn } = useAuthentication();
  const router = useRouter();

  if (!isLoggedIn) router.push('/login');
  const form = useRef<FormikProps<DeleteEntrantBody>>(null);
  const toast = useToast();
  const { displayError } = useToastError();
  const handleFormSubmit = async (values: DeleteEntrantBody) => {
    try {
      await ContractAPI.deleteEntrant(prepareData(values));
      toast.success(
        `${values.action} у ${values.firstName} ${values.lastName} ${values.middleName} видалено`,
      );
    } catch (error) {
      displayError(error);
    }
  };

  useTabClose(() => {
    if (form?.current?.values) {
      saveLocalStorage(form?.current?.values);
    }
  });

  return (
    <Formik
      innerRef={form}
      initialValues={getLocalStorage() || initialValues}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      {({ isValid }) => (
        <Form
          style={{ gap: '40px', paddingTop: '24px', paddingBottom: '50px' }}
        >
          <Box sx={{ gap: '24px' }}>
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
          </Box>
          <Box sx={stylesMui.item}>
            <FormikDropdown
              options={EntrantActionsOptions}
              name="action"
              size={FieldSize.LARGE}
              label="Вибрати дію"
              placeholder="Вибрати дію"
            />
          </Box>

          <Button type={'submit'} text="Видалити" disabled={!isValid} />
        </Form>
      )}
    </Formik>
  );
};

export default EntrantAdmin;
