'use client';

import React from 'react';
import { CreateContractDTO } from '@fictadvisor/utils/requests';
import { Box } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import {
  initialValues,
  SPECIALITIES,
} from 'src/app/(admission)/(main)/_contract-admin/constants';
import { validationSchema } from 'src/app/(admission)/(main)/_contract-admin/validation';

import * as styles from '@/app/(admission)/(main)/_contract-admin/ContractAdminPage.styles';
import Breadcrumbs from '@/components/common/ui/breadcrumbs';
import Button from '@/components/common/ui/button-mui';
import Divider from '@/components/common/ui/divider';
import { DividerTextAlign } from '@/components/common/ui/divider/types';
import { Input } from '@/components/common/ui/form';
import { FieldSize } from '@/components/common/ui/form/common/types';
import FormikDropdown from '@/components/common/ui/form/with-formik/dropdown';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import contractAPI from '@/lib/api/contract/ContractAPI';

const ContractAdminSubmission = () => {
  const { displayError } = useToastError();
  const toast = useToast();
  const handleSubmit = async (
    values: CreateContractDTO,
    { resetForm }: FormikHelpers<CreateContractDTO>,
  ) => {
    try {
      await contractAPI.createAdminContract(values);
      toast.success('Договір створений', '', 4000);
      resetForm();
    } catch (error) {
      displayError(error);
    }
  };

  return (
    <Box sx={styles.page}>
      <Breadcrumbs
        sx={styles.breadcrumbs}
        items={[
          { label: 'Головна', href: '/' },
          { label: 'Договір про навчання', href: '/_contract-admin' },
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

export default ContractAdminSubmission;
