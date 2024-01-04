import React, { FC } from 'react';
import { Box } from '@mui/material';
import { Form, Formik } from 'formik';

import Button from '@/components/common/ui/button-mui';
import Divider from '@/components/common/ui/divider';
import { DividerTextAlign } from '@/components/common/ui/divider/types';
import { Input } from '@/components/common/ui/form';
import { validationSchema } from '@/components/pages/priority-approve-page/validation';
import { Fullname } from '@/types/contract';

import * as styles from '../PriorityApprovePage.styles';

interface EntrantPriorityFormProps {
  submit: (values: Fullname) => Promise<void>;
  initValues: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
}

const EntrantPriorityForm: FC<EntrantPriorityFormProps> = ({
  submit,
  initValues,
}) => {
  return (
    <Formik
      initialValues={initValues}
      onSubmit={submit}
      validationSchema={validationSchema}
    >
      {() => (
        <Form>
          <Box sx={styles.form}>
            <Box sx={styles.item}>
              <Divider
                sx={styles.divider}
                textAlign={DividerTextAlign.LEFT}
                text="Дані про вступника"
              />
              <Input name="lastName" placeholder="Прізвище вступника" />
              <Input name="firstName" placeholder="Ім'я вступника" />
              <Input name="middleName" placeholder="По батькові вступника" />
            </Box>
            <Button sx={styles.button} text="Знайти" type="submit" />
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default EntrantPriorityForm;
