import React, { FC, useState } from 'react';
import { Box, CardHeader, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
} from '@/components/common/ui/button-mui/types';
import { InputSize, InputType } from '@/components/common/ui/form';
import Input from '@/components/common/ui/form/input-mui';
import * as stylesAdmin from '@/components/pages/admin/common/styles/AdminPages.styles';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import SubjectAPI from '@/lib/api/subject/SubjectAPI';

const CreateSubjectAdminPage: FC = () => {
  const toast = useToast();
  const { displayError } = useToastError();
  const router = useRouter();

  const [subject, setSubject] = useState<string>('');
  const handleSubjectCreation = async () => {
    try {
      await SubjectAPI.createSubject(subject);
      toast.success('Предмет успішно створений!', '', 4000);
      router.replace('/admin/subjects');
    } catch (e) {
      displayError(e);
    }
  };
  return (
    <>
      <Box sx={stylesAdmin.header}>
        <CardHeader title="Створення предмету" sx={stylesAdmin.title} />
        <Stack flexDirection="row" gap="8px">
          <Button
            size={ButtonSize.MEDIUM}
            text="Скасувати"
            color={ButtonColor.SECONDARY}
            href="/admin/subjects"
            sx={stylesAdmin.button}
          />
          <Button
            size={ButtonSize.MEDIUM}
            text="Зберегти"
            onClick={() => handleSubjectCreation()}
            sx={stylesAdmin.button}
          />
        </Stack>
      </Box>
      <Input
        value={subject}
        onChange={setSubject}
        size={InputSize.MEDIUM}
        type={InputType.DEFAULT}
        placeholder="Предмет"
        showRemark={false}
        sx={stylesAdmin.input}
      />
    </>
  );
};

export default CreateSubjectAdminPage;
