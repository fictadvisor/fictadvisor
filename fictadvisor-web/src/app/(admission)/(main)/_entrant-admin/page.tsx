'use client';

import React, { useRef } from 'react';
import { DeleteEntrantDataQueryDTO } from '@fictadvisor/utils/requests';
import { Box } from '@mui/material';
import { Form, Formik, FormikProps } from 'formik';
import { useRouter } from 'next/navigation';
import {
  EntrantActionsOptions,
  initialValues,
} from 'src/app/(admission)/(main)/_entrant-admin/constants';
import { validationSchema } from 'src/app/(admission)/(main)/_entrant-admin/validation';

import * as stylesMui from '@/app/(admission)/_contract/ContractPage.styles';
import {
  getLocalStorage,
  saveLocalStorage,
} from '@/app/(admission)/(main)/_entrant-admin/utils/localStorage';
import { prepareData } from '@/app/(admission)/(main)/_entrant-admin/utils/prepareData';
import Button from '@/components/common/ui/button-mui';
import Divider from '@/components/common/ui/divider';
import { DividerTextAlign } from '@/components/common/ui/divider/types';
import { Input } from '@/components/common/ui/form';
import { FieldSize } from '@/components/common/ui/form/common/types';
import FormikDropdown from '@/components/common/ui/form/with-formik/dropdown';
import { useAuthentication } from '@/hooks/use-authentication/useAuthentication';
import useTabClose from '@/hooks/use-tab-close';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import ContractAPI from '@/lib/api/contract/ContractAPI';

const EntrantAdmin = () => {
  const { user } = useAuthentication();
  const router = useRouter();

  if (!user) router.push('/login');
  const form = useRef<FormikProps<DeleteEntrantDataQueryDTO>>(null);
  const toast = useToast();
  const { displayError } = useToastError();
  const handleFormSubmit = async (values: DeleteEntrantDataQueryDTO) => {
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
