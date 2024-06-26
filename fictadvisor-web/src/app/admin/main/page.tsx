'use client';

import React, { useRef } from 'react';
import { Box, CardHeader, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';

import * as styles from '@/app/admin/main/AdminHomePage.styles';
import PageTextsForm from '@/app/admin/main/components/page-texts-form';
import StudentResourcesForm from '@/app/admin/main/components/student-resources-form';
import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
} from '@/components/common/ui/button-mui/types';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';

const Page = () => {
  const toast = useToast();
  const { displayError } = useToastError();
  const router = useRouter();
  const handleCancelClick = () => {
    router.push('/admin');
  };
  type PageTextsFormType = {
    pageTextSubmit: () => Promise<void>;
  };

  type StudentResourcesFormType = {
    studentResourceSubmit: () => Promise<void>;
  };

  const pageTextsFormRef = useRef<PageTextsFormType | null>(null);
  const studentResourceFormRef = useRef<StudentResourcesFormType | null>(null);

  const handleSubmit = async () => {
    try {
      if (pageTextsFormRef.current) {
        await pageTextsFormRef.current.pageTextSubmit();
      }
      if (studentResourceFormRef.current) {
        await studentResourceFormRef.current.studentResourceSubmit();
      }
      toast.success('Зміни збережено!', '', 4000);
    } catch (error) {
      displayError(error);
    }
  };

  return (
    <>
      <Box sx={styles.header}>
        <CardHeader title="Головна сторінка" sx={styles.title} />
        <Stack flexDirection="row" gap="8px">
          <Button
            size={ButtonSize.MEDIUM}
            text="Скасувати"
            color={ButtonColor.SECONDARY}
            sx={styles.button}
            onClick={handleCancelClick}
          />
          <Button
            size={ButtonSize.MEDIUM}
            text="Зберегти"
            type="submit"
            sx={styles.button}
            onClick={handleSubmit}
          />
        </Stack>
      </Box>
      <PageTextsForm ref={pageTextsFormRef} />
      <StudentResourcesForm ref={studentResourceFormRef} />
    </>
  );
};

export default Page;
