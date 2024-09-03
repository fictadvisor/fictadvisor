'use client';
import React, { FC, useState } from 'react';
import {
  CreateContactDTO,
  UpdateTeacherDTO,
} from '@fictadvisor/utils/requests';
import { Box, Divider } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { useQueryAdminOptions } from '@/app/admin/common/constants';
import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import TeacherContactsInputs from '@/app/admin/teachers/common/components/teacher-contacts-inputs';
import TeacherPersonalInputs from '@/app/admin/teachers/common/components/teacher-personal-inputs';
import EditTeacherComments from '@/app/admin/teachers/edit/[teacherId]/components/edit-teacher-comments';
import HeaderEdit from '@/app/admin/teachers/edit/[teacherId]/components/header-edit';
import { EditedComment } from '@/app/admin/teachers/edit/[teacherId]/types';
import { CheckboxesDropdownOption } from '@/components/common/ui/form/checkboxes-dropdown/types/CheckboxesDropdown';
import LoadPage from '@/components/common/ui/load-page/LoadPage';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import TeacherAPI from '@/lib/api/teacher/TeacherAPI';

interface PageProps {
  params: {
    teacherId: string;
  };
}

const Edit: FC<PageProps> = ({ params }) => {
  const {
    data: teacher,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ['teacher', params.teacherId],
    queryFn: () => TeacherAPI.get(params.teacherId),
    ...useQueryAdminOptions,
  });

  if (!isSuccess) throw new Error('Something went wrong in teacher edit page');

  const initialValues = {
    firstName: teacher.firstName,
    lastName: teacher.lastName,
    middleName: teacher.middleName,
    description: teacher.description,
    avatar: teacher.avatar,
  };
  const initialTeacherCathedras = teacher.cathedras.map(cathedra => ({
    id: cathedra.id,
    value: cathedra.name,
    label: cathedra.abbreviation,
  }));
  const toast = useToast();
  const { displayError } = useToastError();
  const router = useRouter();
  const [personalInfo, setPersonalInfo] =
    useState<UpdateTeacherDTO>(initialValues);
  const [selectedTeacherCathedras, setSelectedTeacherCathedras] = useState<
    CheckboxesDropdownOption[]
  >(initialTeacherCathedras);
  const [changedContacts, setChangedContacts] = useState<CreateContactDTO[]>(
    [],
  );

  const [changedComments, setChangedComments] = useState<EditedComment[]>([]);

  const handleEditSubmit = async () => {
    try {
      await TeacherAPI.editPersonalInfo(teacher.id, personalInfo);

      for (const contact of changedContacts) {
        await TeacherAPI.editTeacherContacts(teacher.id, contact.name, {
          displayName: contact.displayName,
          link: contact.link,
        });
      }

      for (const cathedra of initialTeacherCathedras) {
        if (!selectedTeacherCathedras.some(item => item.id === cathedra.id)) {
          await TeacherAPI.deleteTeacherCathedra(teacher.id, cathedra.id);
        }
      }
      for (const cathedra of selectedTeacherCathedras) {
        if (cathedra.id) {
          if (!initialTeacherCathedras.some(item => item.id === cathedra.id)) {
            await TeacherAPI.editTeacherCathedra(teacher.id, cathedra.id);
          }
        }
      }

      for (const comment of changedComments) {
        await TeacherAPI.updateComment(comment.disciplineTeacherId, {
          userId: comment.userId,
          questionId: comment.questionId,
          comment: comment.comment,
        });
      }

      toast.success('Викладач успішно змінений!', '', 4000);
      router.replace('/admin/teachers');
    } catch (e) {
      displayError(e);
    }
  };

  const handleDeleteSubmit = async () => {
    try {
      await TeacherAPI.delete(teacher.id);
      toast.success('Викладач успішно видалений!', '', 4000);
      router.replace('/admin/teachers');
    } catch (e) {
      displayError(e);
    }
  };

  if (isLoading) return <LoadPage />;

  return (
    <Box sx={{ p: '16px' }}>
      <HeaderEdit
        teacher={teacher}
        handleEditSubmit={handleEditSubmit}
        handleDeleteSubmit={handleDeleteSubmit}
      />
      <Box sx={stylesAdmin.infoWrapper}>
        <TeacherPersonalInputs
          personalInfo={personalInfo}
          setPersonalInfo={setPersonalInfo}
          selectedCathedras={selectedTeacherCathedras}
          setSelectedCathedras={setSelectedTeacherCathedras}
        />
        <Divider sx={stylesAdmin.dividerHor} />
        <TeacherContactsInputs
          contacts={teacher.contacts}
          setNewContacts={setChangedContacts}
        />
        <Divider sx={stylesAdmin.dividerHor} />
        <EditTeacherComments
          teacher={teacher}
          setChangedComments={setChangedComments}
        />
      </Box>
    </Box>
  );
};

export default Edit;
