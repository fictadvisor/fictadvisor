'use client';
import React, { useState } from 'react';
import { TeacherWithRolesAndCathedrasResponse } from '@fictadvisor/utils/responses';
import { Box, CardHeader, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';

import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import TransferList from '@/app/admin/departments/common/components/transfer-list';
import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
} from '@/components/common/ui/button-mui/types';
import Divider from '@/components/common/ui/divider';
import { InputSize, InputType } from '@/components/common/ui/form';
import Input from '@/components/common/ui/form/input-mui';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import CathedraAPI from '@/lib/api/cathedras/CathedraAPI';

const Page = () => {
  const toast = useToast();
  const { displayError } = useToastError();
  const router = useRouter();

  const [name, setName] = useState<string>('');
  const [abbreviation, setAbbreviation] = useState<string>('');
  const [division, setDivision] = useState<string>('');
  const [left, setLeft] = useState<TeacherWithRolesAndCathedrasResponse[]>([]);
  const [right, setRight] = useState<TeacherWithRolesAndCathedrasResponse[]>(
    [],
  );

  const handleSubjectCreation = async () => {
    try {
      await CathedraAPI.createDepartment({
        name,
        abbreviation,
        division,
        teachers: right.map(teacher => teacher.id),
      });
      toast.success('Кафедра успішно створена!', '', 4000);
      router.replace('/admin/departments');
    } catch (e) {
      displayError(e);
    }
  };

  return (
    <Box sx={{ padding: '16px' }}>
      <Box sx={stylesAdmin.header}>
        <CardHeader title="Створення" sx={stylesAdmin.title} />
        <Stack flexDirection="row" gap="8px">
          <Button
            size={ButtonSize.MEDIUM}
            text="Скасувати"
            color={ButtonColor.SECONDARY}
            href="/admin/departments"
          />
          <Button
            size={ButtonSize.MEDIUM}
            text="Зберегти"
            onClick={() => handleSubjectCreation()}
          />
        </Stack>
      </Box>
      <Stack maxWidth={308} flexDirection="column" gap="16px" padding="16px">
        <Input
          value={name}
          onChange={setName}
          size={InputSize.MEDIUM}
          type={InputType.DEFAULT}
          showRemark={false}
          placeholder="Назва кафедри"
        />
        <Input
          value={abbreviation}
          onChange={setAbbreviation}
          size={InputSize.MEDIUM}
          type={InputType.DEFAULT}
          showRemark={false}
          placeholder="Абревіатура"
        />
        <Input
          value={division}
          onChange={setDivision}
          size={InputSize.MEDIUM}
          type={InputType.DEFAULT}
          showRemark={false}
          placeholder="Підрозділ"
        />
      </Stack>
      <Divider sx={stylesAdmin.dividerHor} />
      <TransferList
        cathedraId={''}
        leftList={left}
        rightList={right}
        onRightListChange={setRight}
        onLeftListChange={setLeft}
      />
    </Box>
  );
};

export default Page;
