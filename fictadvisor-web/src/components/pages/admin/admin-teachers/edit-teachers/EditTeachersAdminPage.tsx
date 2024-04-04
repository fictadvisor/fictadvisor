'use client';
import React, { FC, useState } from 'react';
import { Box, Divider } from '@mui/material';
import { useRouter } from 'next/navigation';

import { CheckboxesDropdownOption } from '@/components/common/ui/form/checkboxes-dropdown/types/CheckboxesDropdown';
import * as stylesAdmin from '@/components/pages/admin/common/styles/AdminPages.styles';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import TeacherAPI from '@/lib/api/teacher/TeacherAPI';
import { Contact } from '@/types/contact';
import { Teacher } from '@/types/teacher';

import TeacherContactsInputs from '../common/components/teacher-contacts-inputs';
import TeacherPersonalInputs from '../common/components/teacher-personal-inputs';
import { PersonalInfo } from '../common/types';

import EditTeacherComments from './components/edit-teacher-comments';
import HeaderEdit from './components/header-edit';
import { EditedComment } from './types';

interface EditTeachersAdminPageProps {
  teacher: Teacher;
}

const EditTeachersAdminPage: FC<EditTeachersAdminPageProps> = ({ teacher }) => {
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
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(initialValues);
  const [selectedTeacherCathedras, setSelectedTeacherCathedras] = useState<
    CheckboxesDropdownOption[]
  >(initialTeacherCathedras);
  const [changedContacts, setChangedContacts] = useState<Contact[]>([]);

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
        await TeacherAPI.updateComment(
          {
            userId: comment.userId,
            questionId: comment.questionId,
            comment: comment.comment,
          },
          comment.disciplineTeacherId,
        );
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

export default EditTeachersAdminPage;
