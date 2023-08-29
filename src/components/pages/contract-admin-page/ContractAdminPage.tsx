import React from 'react';
import { Box } from '@mui/material';
import axios from 'axios';
import { Form, Formik, FormikHelpers } from 'formik';

import Breadcrumbs from '@/components/common/ui/breadcrumbs';
import Button from '@/components/common/ui/button-mui';
import Divider from '@/components/common/ui/divider';
import { DividerTextAlign } from '@/components/common/ui/divider/types';
import { Input } from '@/components/common/ui/form';
import { FieldSize } from '@/components/common/ui/form/common/types';
import FormikDropdown from '@/components/common/ui/form/with-formik/dropdown';
import { checkError } from '@/components/pages/contract-admin-page/utils';
import { validationSchema } from '@/components/pages/contract-admin-page/validation';
import useToast from '@/hooks/use-toast';
import contractAPI from '@/lib/api/contract/ContractAPI';
import { AdminContractBody } from '@/lib/api/contract/types/AdminContractBody';
import getErrorMessage from '@/lib/utils/getErrorMessage';

import { initialValues, SPECIALITIES } from './constants/index';
import * as styles from './ContractAdminPage.styles';

const TOAST_TIMER = 4000;

const ContractAdminPage = () => {
  const toast = useToast();
  const handleSubmit = async (
    values: AdminContractBody,
    { resetForm }: FormikHelpers<AdminContractBody>,
  ) => {
    try {
      await contractAPI.createAdminContract(values);
      toast.success('Договір створений', '', TOAST_TIMER);
      resetForm();
    } catch (error) {
      const message = getErrorMessage(error);
      message
        ? toast.error(message, '', TOAST_TIMER)
        : toast.error('Щось пішло не так, спробуй пізніше!');
      // if (axios.isAxiosError(error)) {
      //   const errorMessage = checkError(error.response?.data.error);
      //   if (errorMessage) {
      //     toast.error(errorMessage, '', TOAST_TIMER);
      //   }
      // }
    }
  };

  return (
    <Box sx={styles.page}>
      <Breadcrumbs
        sx={styles.breadcrumbs}
        items={[
          { label: 'Головна', href: '/' },
          { label: 'Договір про навчання', href: '/contract-admin' },
        ]}
      />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {() => (
          <Form>
            <Box sx={styles.form}>
              <Box sx={styles.item}>
                <Divider
                  sx={styles.divider}
                  textAlign={DividerTextAlign.LEFT}
                  text="Деталі договору"
                />
                <Input name="contract.number" placeholder="Номер договору" />
                <Input name="contract.date" placeholder="Дата заповнення" />
              </Box>
              <Box sx={styles.item}>
                <Divider
                  sx={styles.divider}
                  textAlign={DividerTextAlign.LEFT}
                  text="Дані вступника"
                />
                <Input name="entrant.lastName" placeholder="Прізвище" />
                <Input name="entrant.firstName" placeholder="Ім'я" />
                <Input name="entrant.middleName" placeholder="По батькові" />
                <FormikDropdown
                  size={FieldSize.LARGE}
                  options={SPECIALITIES}
                  label="Спеціальність"
                  name="entrant.specialty"
                  placeholder="виберіть зі списку"
                />
              </Box>
              <Button sx={styles.button} text="Відправити" type="submit" />
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ContractAdminPage;
