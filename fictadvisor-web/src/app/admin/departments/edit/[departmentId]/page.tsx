'use client';
import React, { FC, useState } from 'react';
import { useQuery } from 'react-query';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Box, CardHeader, Divider, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';

import { useQueryAdminOptions } from '@/app/admin/common/constants';
import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import TransferList from '@/app/admin/departments/common/components/transfer-list';
import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import DeletePopup from '@/components/common/ui/delete-popup';
import { InputSize, InputType } from '@/components/common/ui/form';
import { FieldSize } from '@/components/common/ui/form/common/types';
import Input from '@/components/common/ui/form/input-mui';
import LoadPage from '@/components/common/ui/load-page';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import CathedraAPI from '@/lib/api/cathedras/CathedraAPI';
import { Teacher } from '@/types/teacher';

import Dropdown from '../../../../../components/common/ui/form/dropdown';

interface AdminDepartmentEditProps {
  params: {
    departmentId: string;
  };
}

const Page: FC<AdminDepartmentEditProps> = ({ params }) => {
  const { data: department, isLoading } = useQuery(
    ['departmentById', params.departmentId],
    () => CathedraAPI.getDepartmentById(params.departmentId),
    useQueryAdminOptions,
  );

  if (!department)
    throw new Error('Something went wrong in department edit page');

  const toast = useToast();
  const { displayError } = useToastError();
  const router = useRouter();
  const [name, setName] = useState<string>(department.data.name);
  const [abbreviation, setAbbreviation] = useState<string>(
    department.data.abbreviation,
  );
  const [isOpen, setIsOpen] = useState(false);
  const [division, setDivision] = useState<string>(department.data.division);
  const [left, setLeft] = useState<Teacher[]>([]);
  const [right, setRight] = useState<Teacher[]>([]);

  const { data: divisionData, isLoading: isLoadingDivisions } = useQuery(
    ['divisions', department.data.id],
    () => CathedraAPI.getDivisions(),
    useQueryAdminOptions,
  );

  const { data: inDepartmentData, isLoading: isLoadingDepartment } = useQuery(
    ['inDepartment', department.data.id, false],
    () => CathedraAPI.getDepartmentTeachers(department.data.id, false),
    useQueryAdminOptions,
  );

  if (isLoadingDivisions || isLoadingDepartment) return <LoadPage />;

  if (!divisionData || !inDepartmentData)
    throw new Error(`An error has occurred`);

  const faculties = divisionData.divisions.map(faculty => ({
    id: faculty,
    label: faculty,
  }));

  const handleEdit = async () => {
    try {
      const toDelete = inDepartmentData.teachers.map(teacher => teacher.id);
      const toAdd = right.map(teacher => teacher.id);
      await CathedraAPI.editDepartment(
        department.data.id,
        name,
        abbreviation,
        division,
        toDelete,
        toAdd,
      );
      toast.success('Кафедра успішно змінена!', '', 4000);
      router.replace('/admin/departments');
    } catch (e) {
      displayError(e);
    }
  };

  const handleDelete = async (departmentId: string) => {
    try {
      await CathedraAPI.deleteDepartment(departmentId);
      toast.success('Кафедра успішно видалена!', '', 4000);
      router.replace('/admin/departments');
    } catch (e) {
      displayError(e);
    }
  };

  if (isLoading) return <LoadPage />;

  return (
    <Box sx={{ padding: '16px' }}>
      <Box sx={stylesAdmin.header}>
        <CardHeader
          title="Редагування"
          subheader={department.data.name}
          sx={stylesAdmin.title}
        />
        <Stack flexDirection="row" gap="8px">
          <Button
            size={ButtonSize.MEDIUM}
            color={ButtonColor.SECONDARY}
            text="Скасувати"
            href="/admin/departments"
            sx={stylesAdmin.button}
          />
          <Button
            size={ButtonSize.MEDIUM}
            variant={ButtonVariant.OUTLINE}
            color={ButtonColor.SECONDARY}
            startIcon={<TrashIcon />}
            text="Видалити"
            onClick={() => setIsOpen(true)}
            sx={stylesAdmin.button}
          />
          {isOpen && (
            <DeletePopup
              setPopupOpen={setIsOpen}
              handleDeleteSubmit={() => handleDelete(department.data.id)}
              name={`Департамент ${department.data.name}`}
            />
          )}
          <Button
            size={ButtonSize.MEDIUM}
            text="Зберегти"
            onClick={() => handleEdit()}
            sx={stylesAdmin.button}
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
      <Divider sx={stylesAdmin.dividerHor} />
      <TransferList
        cathedraId={department.data.id}
        leftList={left}
        rightList={right}
        onLeftListChange={setLeft}
        onRightListChange={setRight}
      />
    </Box>
  );
};

export default Page;
