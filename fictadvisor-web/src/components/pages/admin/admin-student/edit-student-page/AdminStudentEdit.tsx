'use client';
import React, { FC, useState } from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { Box, Divider } from '@mui/material';
import { isAxiosError } from 'axios';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';

import Button from '@/components/common/ui/button';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import StudentAPI from '@/lib/api/student/StudentAPI';
import { GetRemainingSelectivesResponse } from '@/lib/api/student/types/GetRemainingSelectivesResponse';
import { GetSelectivesResponse } from '@/lib/api/student/types/GetSelectivesResponse';
import { GroupStudent } from '@/types/student';

import { StudentEdit } from '../common/types/StudentEdit';
import { deleteCommonValues } from '../common/utils/deleteCommonValues';

import EditSelective from './components/edit-selective';
import EditStudentInputs from './components/edit-student-inputs';
import HeaderStudentEdit from './components/header-student-edit';
import { validationSchema } from './constants/Validation';
import * as styles from './AdminStudentEdit.styles';
export interface AdminStudentEditProps {
  student: GroupStudent;
  selectives: GetSelectivesResponse[];
  remainingSelectives: GetRemainingSelectivesResponse[];
}
const AdminStudentEdit: FC<AdminStudentEditProps> = ({
  student,
  selectives,
  remainingSelectives,
}) => {
  const initialValues = {
    firstName: student.firstName,
    middleName: student.middleName,
    lastName: student.lastName,
    groupId: student.group.id,
    roleName: student.group.role,
  };
  const [connectedSelective, setConnectedSelective] = useState<string[]>([]);
  const [disconnectedSelective, setDisconnectedSelective] = useState<string[]>(
    [],
  );
  const toast = useToast();
  const { displayError } = useToastError();
  const router = useRouter();

  const deleteStudent = async (userId: string) => {
    try {
      await StudentAPI.delete(userId);
      toast.success('Студент успішно видалений!', '', 4000);
      router.replace('/admin/students');
    } catch (e) {
      if (isAxiosError(e)) {
        displayError(e);
      }
    }
  };

  const handleSubmit = async (data: StudentEdit) => {
    try {
      data.middleName = data.middleName ? data.middleName : undefined;
      deleteCommonValues(connectedSelective, disconnectedSelective);

      await StudentAPI.editStudent(student.id, data);
      await StudentAPI.editSelective(student.id, {
        connectedSelective,
        disconnectedSelective,
      });
      toast.success('Студент успішно змінений!', '', 4000);
      setConnectedSelective([]);
      setDisconnectedSelective([]);
    } catch (error) {
      displayError(error);
      if (isAxiosError(error)) {
        displayError(error);
      }
    }
  };

  return (
    <Formik
      enableReinitialize
      validationSchema={validationSchema}
      initialValues={initialValues}
      validateOnChange
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <HeaderStudentEdit student={student} handleDelete={deleteStudent} />
          <Box sx={styles.body}>
            <EditStudentInputs />
            <Box sx={styles.editButton}>
              <Button
                text="Редагування користувача"
                startIcon={<PencilSquareIcon width={'24px'} height={'24px'} />}
                variant={ButtonVariant.OUTLINE}
                size={ButtonSize.SMALL}
                color={ButtonColor.SECONDARY}
                onClick={() =>
                  router.push(`/admin/students/edit/${student.id}`)
                }
              />
            </Box>
            <Divider sx={styles.divider} />
            <EditSelective
              connectedSelective={connectedSelective}
              selectives={selectives}
              remainingSelectives={remainingSelectives}
              setDisconnectedSelective={setDisconnectedSelective}
              setConnectedSelective={setConnectedSelective}
            />
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default AdminStudentEdit;
