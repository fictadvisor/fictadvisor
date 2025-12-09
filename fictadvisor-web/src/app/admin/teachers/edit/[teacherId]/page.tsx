'use client';
import React, { FC, use, useCallback, useEffect, useState } from 'react';
import { UpdateTeacherDTO } from '@fictadvisor/utils/requests';
import { ContactResponse } from '@fictadvisor/utils/responses';
import { Box, Divider } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { useQueryAdminOptions } from '@/app/admin/common/constants';
import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import TeacherContactsInputs from '@/app/admin/teachers/common/components/teacher-contacts-inputs';
import TeacherPersonalInputs from '@/app/admin/teachers/common/components/teacher-personal-inputs';
import EditTeacherComments from '@/app/admin/teachers/edit/[teacherId]/components/edit-teacher-comments';
import HeaderEdit from '@/app/admin/teachers/edit/[teacherId]/components/header-edit';
import {
  EditedComment,
  InitialTeacherCathedras,
} from '@/app/admin/teachers/edit/[teacherId]/types';
import { CheckboxesDropdownOption } from '@/components/common/ui/form/checkboxes-dropdown/types/CheckboxesDropdown';
import LoadPage from '@/components/common/ui/load-page/LoadPage';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import TeacherAPI from '@/lib/api/teacher/TeacherAPI';

interface PageProps {
  params: Promise<{
    teacherId: string;
  }>;
}

const Edit: FC<PageProps> = ({ params }) => {
  const { teacherId } = use(params);

  const {
    data: teacher,
    isSuccess,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['teacher', teacherId],
    queryFn: () => TeacherAPI.get(teacherId),
    ...useQueryAdminOptions,
  });

  const [initialTeacherCathedras, setInitialTeacherCathedras] =
    useState<InitialTeacherCathedras[]>();

  const toast = useToast();
  const { displayError } = useToastError();
  const router = useRouter();

  const [personalInfo, setPersonalInfo] = useState<UpdateTeacherDTO>({});
  const [contacts, setContacts] = useState<ContactResponse[]>([]);

  useEffect(() => {
    if (!teacher || !isSuccess) return;

    setPersonalInfo(() => ({
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      middleName: teacher.middleName,
      description: teacher.description,
      avatar: teacher.avatar,
    }));

    setInitialTeacherCathedras(
      teacher.cathedras.map(cathedra => ({
        id: cathedra.id,
        value: cathedra.name,
        label: cathedra.abbreviation,
      })),
    );
  }, [teacher, isSuccess]);
  const [selectedTeacherCathedras, setSelectedTeacherCathedras] = useState<
    CheckboxesDropdownOption[]
  >([]);

  useEffect(() => {
    if (!initialTeacherCathedras) return;

    setSelectedTeacherCathedras(initialTeacherCathedras);
  }, [initialTeacherCathedras]);

  const [changedComments, setChangedComments] = useState<EditedComment[]>([]);

  const handleEditSubmit = useCallback(async () => {
    if (
      !teacher ||
      !initialTeacherCathedras ||
      !selectedTeacherCathedras ||
      !personalInfo ||
      !changedComments
    )
      return;

    try {
      await TeacherAPI.editPersonalInfo(teacher.id, personalInfo);
      for (const contact of contacts) {
        if (contact.id === '') {
          await TeacherAPI.createTeacherContacts(teacher.id, {
            name: contact.name,
            displayName: contact.displayName,
            link: contact.link,
          });
        } else {
          await TeacherAPI.editTeacherContacts(teacher.id, contact.id, {
            displayName: contact.displayName,
            link: contact.link,
          });
        }
      }

      const contactsToDelete = teacher.contacts.filter(
        contact => !contacts.map(({ id }) => id).includes(contact.id),
      );

      for (const { id } of contactsToDelete) {
        await TeacherAPI.deleteTeacherContact(teacher.id, id);
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
  }, [
    teacher,
    contacts,
    selectedTeacherCathedras,
    initialTeacherCathedras,
    personalInfo,
    changedComments,
  ]);

  const handleDeleteSubmit = useCallback(async () => {
    if (!teacher) return;

    try {
      await TeacherAPI.delete(teacher.id);
      toast.success('Викладач успішно видалений!', '', 4000);
      router.replace('/admin/teachers');
    } catch (e) {
      displayError(e);
    }
  }, [teacher]);

  if (isLoading) return <LoadPage />;

  if (error) displayError(error);
  if (!isSuccess) throw new Error('Something went wrong in teacher edit page');

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
          contacts={teacher?.contacts ?? []}
          setContacts={setContacts}
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
