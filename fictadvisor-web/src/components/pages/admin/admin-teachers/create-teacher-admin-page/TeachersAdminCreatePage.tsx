'use client';
import React, { FC, useState } from 'react';
import { Box, Divider } from '@mui/material';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import { CheckboxesDropdownOption } from '@/components/common/ui/form/checkboxes-dropdown/types/CheckboxesDropdown';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import TeacherAPI from '@/lib/api/teacher/TeacherAPI';
import { Contact } from '@/types/contact';

import TeacherContactsInputs from '../common/components/teacher-contacts-inputs';
import TeacherPersonalInfo from '../common/components/teacher-personal-inputs';

import HeaderCreate from './components/header-create';
import * as styles from './TeachersAdminCreatePage.styles';
import { PersonalInfo } from './types';

const TeachersAdminEditPage: FC = () => {
  const toast = useToast();
  const toastError = useToastError();
  const router = useRouter();

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(
    {} as PersonalInfo,
  );
  const [selectedCathedras, setSelectedCathedras] = useState<
    CheckboxesDropdownOption[]
  >([]);

  const [createContacts, setCreateContacts] = useState<Contact[]>([]);

  const handleEditSubmit = async () => {
    try {
      const createdTeacher = await TeacherAPI.create(personalInfo);

      for (const contact of createContacts) {
        await TeacherAPI.createTeacherContacts(createdTeacher.id, contact);
      }

      for (const cathedra of selectedCathedras) {
        if (cathedra.id)
          await TeacherAPI.editTeacherCathedra(createdTeacher.id, cathedra.id);
      }

      toast.success('Викладач успішно створений!', '', 4000);
      router.replace('/admin/teachers');
    } catch (e) {
      toastError.displayError(e);
    }
  };

  return (
    <Box sx={{ p: '16px' }}>
      <HeaderCreate handleEditSubmit={handleEditSubmit} />
      <Box sx={styles.infoWrapper}>
        <TeacherPersonalInfo
          personalInfo={personalInfo}
          setPersonalInfo={setPersonalInfo}
          selectedCathedras={selectedCathedras}
          setSelectedCathedras={setSelectedCathedras}
        />
        <Divider sx={styles.divider} />
        <TeacherContactsInputs setNewContacts={setCreateContacts} />
      </Box>
    </Box>
  );
};

export default TeachersAdminEditPage;
