import React, { FC, useRef } from 'react';
import { Box } from '@mui/material';
import { AxiosError } from 'axios';
import { Form, Formik, FormikProps } from 'formik';

import Button from '@/components/common/ui/button-mui';
import Divider from '@/components/common/ui/divider';
import { DividerTextAlign } from '@/components/common/ui/divider/types';
import { FieldSize } from '@/components/common/ui/form/common/types';
import Input from '@/components/common/ui/form/input';
import FormikDropdown from '@/components/common/ui/form/with-formik/dropdown';
import * as stylesMui from '@/components/pages/contract-page/ContractPage.styles';
import {
  EntrantActionsOptions,
  initialValues,
} from '@/components/pages/entrant-admin-page/constants';
import {
  getLocalStorage,
  saveLocalStorage,
} from '@/components/pages/entrant-admin-page/utils/localStorage';
import { validationSchema } from '@/components/pages/entrant-admin-page/validation';
import useTabClose from '@/hooks/use-tab-close';
import useToast from '@/hooks/use-toast';
import ContractAPI from '@/lib/api/contract/ContractAPI';
import { DeleteEntrantBody } from '@/lib/api/contract/types/DeleteEntrantBody';

import { prepareData } from './utils/prepareData';

const EntrantAdminPage: FC = () => {
  const form = useRef<FormikProps<DeleteEntrantBody>>(null);
  const toast = useToast();

  const handleFormSubmit = async (values: DeleteEntrantBody) => {
    try {
      await ContractAPI.deleteEntrant(prepareData(values));
      toast.success(
        `${values.action} у ${values.firstName} ${values.lastName} ${values.middleName} видалено`,
      );
    } catch (error) {
      if ((error as { response: AxiosError }).response.status === 500) {
        toast.error(`Якась чухня з сервером`);
        return;
      }
      toast.error(`Свят, введи ти дані нормально!`);
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

export default EntrantAdminPage;
