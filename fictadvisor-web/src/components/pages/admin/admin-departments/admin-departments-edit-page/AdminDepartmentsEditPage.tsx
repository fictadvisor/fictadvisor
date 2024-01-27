import React, { FC, useState } from 'react';
import { useQuery } from 'react-query';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Box, CardHeader, Divider, Stack } from '@mui/material';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import { InputSize, InputType } from '@/components/common/ui/form';
import { FieldSize } from '@/components/common/ui/form/common/types';
import Dropdown from '@/components/common/ui/form/dropdown';
import Input from '@/components/common/ui/form/input-mui';
import TransferList from '@/components/common/ui/form/transfer-list/TransferList';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import CathedraAPI from '@/lib/api/cathera/CathedraAPI';
import { Cathedra } from '@/lib/api/cathera/types/GetAllResponse';
import { Teacher } from '@/types/teacher';

import * as styles from './AdminDepartmentsEditPage.styles';

interface AdminDepartmentsEditProps {
  department: Cathedra;
}
const AdminDepartmentsEditPage: FC<AdminDepartmentsEditProps> = ({
  department,
}) => {
  const toast = useToast();
  const toastError = useToastError();
  const router = useRouter();
  const [name, setName] = useState<string>(department.name);
  const [abbreviation, setAbbreviation] = useState<string>(
    department.abbreviation,
  );
  const [division, setDivision] = useState<string>(department.division);
  const [left, setLeft] = useState<Teacher[]>([]);
  const [right, setRight] = useState<Teacher[]>([]);

  const { data: divisionData, isSuccess: isDivisionSuccess } = useQuery(
    'divisions',
    () => CathedraAPI.getDivisions(),
  );

  const { data: inDepartmentData, isSuccess: isInDepartmentSuccess } = useQuery(
    'inDepartment',
    () => CathedraAPI.getDepartmentTeachers(department.id, false),
  );
  if (!isDivisionSuccess || !isInDepartmentSuccess)
    return <div>Loading...</div>;
  const faculties = divisionData.divisions.map(faculty => ({
    id: faculty,
    label: faculty,
  }));

  const handleEdit = async () => {
    try {
      const toDelete = inDepartmentData.teachers.map(teacher => teacher.id);
      const toAdd = right.map(teacher => teacher.id);
      await CathedraAPI.editDepartment(
        department.id,
        name,
        abbreviation,
        division,
        toDelete,
        toAdd,
      );
      toast.success('Кафедра успішно змінена!', '', 4000);
      router.replace('/admin/departments');
    } catch (e) {
      if (isAxiosError(e)) {
        toastError.displayError(e.response?.data.message);
      }
    }
  };

  const handleDelete = async (departmentId: string) => {
    try {
      await CathedraAPI.deleteDepartment(departmentId);
      toast.success('Кафедра успішно видалена!', '', 4000);
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
        <CardHeader
          title="Редагування"
          subheader={department.name}
          sx={styles.title}
        />
        <Stack flexDirection="row" gap="8px">
          <Button
            size={ButtonSize.MEDIUM}
            color={ButtonColor.SECONDARY}
            text="Скасувати"
            href="/admin/departments"
            sx={styles.button}
          />
          <Button
            size={ButtonSize.MEDIUM}
            variant={ButtonVariant.OUTLINE}
            color={ButtonColor.SECONDARY}
            startIcon={<TrashIcon />}
            text="Видалити"
            onClick={() => handleDelete(department.id)}
            sx={styles.button}
          />
          <Button
            size={ButtonSize.MEDIUM}
            text="Зберегти"
            onClick={() => handleEdit()}
            sx={styles.button}
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
          label="Назва кафедри"
        />
        <Input
          value={abbreviation}
          onChange={setAbbreviation}
          size={InputSize.MEDIUM}
          type={InputType.DEFAULT}
          showRemark={false}
          label="Абревіатура"
        />
        <Dropdown
          disableClearable
          placeholder="Підрозділ"
          size={FieldSize.MEDIUM}
          options={faculties}
          showRemark={false}
          onChange={setDivision}
          value={division}
          label="Підрозділ"
        />
      </Stack>
      <Divider sx={styles.divider} />
      <TransferList
        cathedraId={department.id}
        leftList={left}
        rightList={right}
        onLeftListChange={setLeft}
        onRightListChange={setRight}
      />
    </>
  );
};

export default AdminDepartmentsEditPage;
