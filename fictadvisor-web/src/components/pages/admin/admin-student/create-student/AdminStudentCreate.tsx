'use client';
import React, { FC, useCallback, useState } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';

import * as stylesAdmin from '@/components/pages/admin/common/styles/AdminPages.styles';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import StudentAPI from '@/lib/api/student/StudentAPI';
import UserAPI from '@/lib/api/user/UserAPI';

import { StudentCreate } from '../common/types';

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
        if (connectedSelective.length) {
          await UserAPI.postSelectiveDisciplines(response.id, {
            disciplines: connectedSelective,
          });
          setConnectedSelective([]);
        }
        toast.success('Студент успішно створений!', '', 4000);
        router.replace('/admin/students');
      } catch (error) {
        displayError(error);
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
        <Form style={{ padding: '16px' }}>
          <HeaderStudentCreate />
          <Box sx={styles.body}>
            <CreateStudentInputs />
            <Divider sx={stylesAdmin.dividerHor} />
            <Box sx={styles.selectivesWrapper}>
              <Typography variant="body1">Вибіркові</Typography>
              {values.groupId ? (
                <CreateSelective
                  groupId={values.groupId}
                  setConnectedSelective={setConnectedSelective}
                />
              ) : (
                <Typography variant="body1">Спочатку обери групу</Typography>
              )}
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default AdminStudentCreate;
