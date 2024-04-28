'use client';

import React, { useCallback, useState } from 'react';
import { CreateStudentWithRolesDTO } from '@fictadvisor/utils/requests';
import { Box, Divider, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';

import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import * as styles from '@/app/admin/students/create/AdminStudentCreate.styles';
import CreateSelective from '@/app/admin/students/create/components/create-selective';
import CreateStudentInputs from '@/app/admin/students/create/components/create-student-inputs';
import HeaderStudentCreate from '@/app/admin/students/create/components/header-student-create';
import {
  initialValues,
  validationSchema,
} from '@/app/admin/students/create/constants/Validation';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import StudentAPI from '@/lib/api/student/StudentAPI';
import UserAPI from '@/lib/api/user/UserAPI';

const AdminCreateStudentPage = () => {
  const [connectedSelectives, setConnectedSelectives] = useState<string[]>([]);

  const toast = useToast();
  const { displayError } = useToastError();
  const router = useRouter();

  const handleSubmit = useCallback(
    async (data: CreateStudentWithRolesDTO) => {
      try {
        const response = await StudentAPI.create(data);
        if (connectedSelectives.length) {
          await UserAPI.postSelectiveDisciplines(response.user.id, {
            disciplines: connectedSelectives,
          });
          setConnectedSelectives([]);
        }
        toast.success('Студент успішно створений!', '', 4000);
        router.replace('/admin/students');
      } catch (error) {
        displayError(error);
      }
    },
    [connectedSelectives, toast, router],
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
                  setConnectedSelectives={setConnectedSelectives}
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

export default AdminCreateStudentPage;
