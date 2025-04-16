'use client';

import React, { useState } from 'react';
import { CreateTeacherDTO } from '@fictadvisor/utils/requests';
import { ContactResponse } from '@fictadvisor/utils/responses';
import { Box, Divider } from '@mui/material';
import { useRouter } from 'next/navigation';

import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import TeacherContactsInputs from '@/app/admin/teachers/common/components/teacher-contacts-inputs';
import TeacherPersonalInfo from '@/app/admin/teachers/common/components/teacher-personal-inputs/TeacherPersonalInputs';
import { PersonalInfo } from '@/app/admin/teachers/common/types';
import HeaderCreate from '@/app/admin/teachers/create/components/header-create';
import { CheckboxesDropdownOption } from '@/components/common/ui/form/checkboxes-dropdown/types/CheckboxesDropdown';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import TeacherAPI from '@/lib/api/teacher/TeacherAPI';

const Create = () => {
  const toast = useToast();
  const toastError = useToastError();
  const router = useRouter();

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(
    {} as PersonalInfo,
  );
  const [selectedCathedras, setSelectedCathedras] = useState<
    CheckboxesDropdownOption[]
  >([]);

  const [createContacts, setCreateContacts] = useState<ContactResponse[]>([]);

  const handleEditSubmit = async () => {
    try {
      const createdTeacher = await TeacherAPI.create(
        personalInfo as CreateTeacherDTO,
      );

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
      <Box sx={stylesAdmin.infoWrapper}>
        <TeacherPersonalInfo
          personalInfo={personalInfo}
          setPersonalInfo={setPersonalInfo}
          selectedCathedras={selectedCathedras}
          setSelectedCathedras={setSelectedCathedras}
        />
        <Divider sx={stylesAdmin.dividerHor} />
        <TeacherContactsInputs setContacts={setCreateContacts} />
      </Box>
    </Box>
  );
};

export default Create;
