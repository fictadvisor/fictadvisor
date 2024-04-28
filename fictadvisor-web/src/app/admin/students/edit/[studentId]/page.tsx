'use client';
import React, { FC, useState } from 'react';
import { useQuery } from 'react-query';
import { UpdateStudentWithRolesDTO } from '@fictadvisor/utils/requests';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { Box, Divider } from '@mui/material';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';

import { useQueryAdminOptions } from '@/app/admin/common/constants';
import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import { deleteCommonValues } from '@/app/admin/students/common/utils/deleteCommonValues';
import * as styles from '@/app/admin/students/edit/[studentId]/AdminStudentEdit.styles';
import EditSelective from '@/app/admin/students/edit/[studentId]/components/edit-selective';
import EditStudentInputs from '@/app/admin/students/edit/[studentId]/components/edit-student-inputs';
import HeaderStudentEdit from '@/app/admin/students/edit/[studentId]/components/header-student-edit';
import { validationSchema } from '@/app/admin/students/edit/[studentId]/constants/Validation';
import Button from '@/components/common/ui/button';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import LoadPage from '@/components/common/ui/load-page/LoadPage';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import StudentAPI from '@/lib/api/student/StudentAPI';

interface AdminStudentEditPageProps {
  params: {
    studentId: string;
  };
}
const AdminStudentEditPage: FC<AdminStudentEditPageProps> = ({ params }) => {
  const { data: student, isLoading: isLoadingStudent } = useQuery(
    ['getStudent', params.studentId],
    () => StudentAPI.getStudent(params.studentId),
    useQueryAdminOptions,
  );

  const { data: selectives, isLoading: isLoadingSelective } = useQuery(
    ['getStudentSelective', params.studentId],
    () => StudentAPI.getSelectives(params.studentId),
    useQueryAdminOptions,
  );
  const { data: remainingSelectives, isLoading: isLoadingRemainingSelectives } =
    useQuery(
      ['getStudentRemainingSelective', params.studentId],
      () => StudentAPI.getRemainingSelectives(params.studentId),
      useQueryAdminOptions,
    );

  const isSuccess = student && selectives && remainingSelectives;

  const isLoading =
    isLoadingSelective || isLoadingRemainingSelectives || isLoadingStudent;

  if (!isSuccess) throw new Error('Something went wrong in student edit page');

  const initialValues: UpdateStudentWithRolesDTO = {
    firstName: student.firstName,
    middleName: student.middleName,
    lastName: student.lastName,
    groupId: student.group.id,
    roleName: student.role,
  };
  const [connectedSelectives, setConnectedSelectives] = useState<string[]>([]);
  const [disconnectedSelectives, setDisconnectedSelectives] = useState<
    string[]
  >([]);
  const toast = useToast();
  const { displayError } = useToastError();
  const router = useRouter();

  const deleteStudent = async (userId: string) => {
    try {
      await StudentAPI.delete(userId);
      toast.success('Студент успішно видалений!', '', 4000);
      router.replace('/admin/students');
    } catch (e) {
      displayError(e);
    }
  };

  const handleSubmit = async (data: UpdateStudentWithRolesDTO) => {
    try {
      data.middleName = data.middleName || undefined;
      deleteCommonValues(connectedSelectives, disconnectedSelectives);

      await StudentAPI.editStudent(student.id, data);
      await StudentAPI.editSelectives(student.id, {
        connectedSelectives,
        disconnectedSelectives,
      });
      toast.success('Студент успішно змінений!', '', 4000);
      setConnectedSelectives([]);
      setDisconnectedSelectives([]);
      router.replace('/admin/students');
    } catch (error) {
      displayError(error);
    }
  };

  if (isLoading) return <LoadPage />;

  return (
    <Formik
      enableReinitialize
      validationSchema={validationSchema}
      initialValues={initialValues}
      validateOnChange
      onSubmit={handleSubmit}
    >
      {() => (
        <Form style={{ padding: '16px' }}>
          <HeaderStudentEdit student={student} handleDelete={deleteStudent} />
          <Box sx={styles.body}>
            <EditStudentInputs />
            <Box sx={stylesAdmin.editButton}>
              <Button
                text="Редагування користувача"
                startIcon={<PencilSquareIcon width="24px" height="24px" />}
                variant={ButtonVariant.OUTLINE}
                size={ButtonSize.SMALL}
                color={ButtonColor.SECONDARY}
                onClick={() =>
                  router.push(`/admin/students/edit/${student.id}`)
                }
              />
            </Box>
            <Divider sx={stylesAdmin.dividerHor} />
            <EditSelective
              connectedSelectives={connectedSelectives}
              selectives={selectives}
              remainingSelectives={remainingSelectives}
              setDisconnectedSelectives={setDisconnectedSelectives}
              setConnectedSelectives={setConnectedSelectives}
            />
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default AdminStudentEditPage;
