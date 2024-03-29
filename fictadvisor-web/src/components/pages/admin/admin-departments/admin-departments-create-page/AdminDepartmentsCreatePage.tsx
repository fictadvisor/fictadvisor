import React, { FC, useState } from 'react';
import { Box, CardHeader, Stack } from '@mui/material';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
} from '@/components/common/ui/button-mui/types';
import Divider from '@/components/common/ui/divider';
import { InputSize, InputType } from '@/components/common/ui/form';
import Input from '@/components/common/ui/form/input-mui';
import TransferList from '@/components/common/ui/form/transfer-list/TransferList';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import CathedraAPI from '@/lib/api/cathera/CathedraAPI';
import { Teacher } from '@/types/teacher';

import * as styles from './AdminDepartmentsCreatePage.styles';

const AdminDepartmentsCreatePage: FC = () => {
  const toast = useToast();
  const toastError = useToastError();
  const router = useRouter();

  const [name, setName] = useState<string>('');
  const [abbreviation, setAbbreviation] = useState<string>('');
  const [division, setDivision] = useState<string>('');
  const [left, setLeft] = useState<Teacher[]>([]);
  const [right, setRight] = useState<Teacher[]>([]);

  const handleSubjectCreation = async () => {
    try {
      await CathedraAPI.createDepartment(
        name,
        abbreviation,
        division,
        right.map(teacher => teacher.id),
      );
      toast.success('Кафедра успішно створена!', '', 4000);
      router.replace('/admin/departments');
    } catch (e) {
      if (isAxiosError(e)) {
        toastError.displayError(e.response?.data.message);
      }
    }
  };
  return (
    <>
      <Box sx={styles.header}>
        <CardHeader title="Створення предмету" sx={styles.title} />
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
      <Divider sx={styles.divider} />
      <TransferList
        cathedraId={''}
        leftList={left}
        rightList={right}
        onRightListChange={setRight}
        onLeftListChange={setLeft}
      />
    </>
  );
};

export default AdminDepartmentsCreatePage;