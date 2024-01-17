'use client';
import React, { FC, useCallback, useState } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { isAxiosError } from 'axios';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';

import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import StudentAPI from '@/lib/api/student/StudentAPI';
import UserAPI from '@/lib/api/user/UserAPI';

import { StudentCreate } from '../common/types/StudentCreate';

import CreateSelective from './components/create-selective';
import CreateStudentInputs from './components/create-student-inputs';
import HeaderStudentCreate from './components/header-student-create';
import { initialValues, validationSchema } from './constants/Validation';
import * as styles from './AdminStudentCreate.styles';

const AdminStudentCreate: FC = () => {
  const [connectedSelective, setConnectedSelective] = useState<string[]>([]);

  const toast = useToast();
  const { displayError } = useToastError();
  const router = useRouter();

  const handleSubmit = useCallback(
    async (data: StudentCreate) => {
      try {
        const response = await StudentAPI.create(data);
        console.log(response);
        if (connectedSelective.length) {
          console.log(connectedSelective);
          await UserAPI.postSelectiveDisciplines(response.id, {
            disciplines: connectedSelective,
          });
          setConnectedSelective([]);
        }
        toast.success('Студент успішно створений!', '', 4000);
        router.replace('/admin/students');
      } catch (error) {
        displayError(error);
        if (isAxiosError(error)) {
          displayError(error.response?.data.message);
        }
      }
    },
    [connectedSelective, toast, router],
  );

  return (
    <Formik
      enableReinitialize
      validationSchema={validationSchema}
      initialValues={initialValues}
      validateOnChange
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form>
          <HeaderStudentCreate />
          <Box sx={styles.body}>
            <CreateStudentInputs />
            <Divider sx={styles.divider} />
            <Box sx={styles.selectivesWrapper}>
              <Typography variant="body1">Вибіркові</Typography>
              {values.groupId ? (
                <CreateSelective
                  groupId={values.groupId}
                  setConnectedSelective={setConnectedSelective}
                />
              ) : (
                <Box>Спочатку обери групу</Box>
              )}
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default AdminStudentCreate;
