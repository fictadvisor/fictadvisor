'use client';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { TeacherWithRolesAndCathedrasResponse } from '@fictadvisor/utils/responses';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Box, CardHeader, Divider, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
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

import Dropdown from '../../../../../components/common/ui/form/dropdown';

interface AdminDepartmentEditProps {
  params: {
    departmentId: string;
  };
}

const Page: FC<AdminDepartmentEditProps> = ({ params }) => {
  const {
    data: department,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['departmentById', params.departmentId],
    queryFn: () => CathedraAPI.getDepartmentById(params.departmentId),
    ...useQueryAdminOptions,
  });

  const toast = useToast();
  const { displayError } = useToastError();
  const router = useRouter();

  const [name, setName] = useState<string>();
  const [abbreviation, setAbbreviation] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);
  const [division, setDivision] = useState<string>();
  const [left, setLeft] = useState<TeacherWithRolesAndCathedrasResponse[]>([]);
  const [right, setRight] = useState<TeacherWithRolesAndCathedrasResponse[]>(
    [],
  );

  useEffect(() => {
    if (!department) return;

    setName(department.data.name);
    setAbbreviation(department.data.abbreviation);
    setDivision(department.data.division);
  }, [department]);

  const { data: divisionData, isLoading: isLoadingDivisions } = useQuery({
    queryKey: ['divisions', department?.data.id],
    queryFn: () => CathedraAPI.getDivisions(),
    enabled: isSuccess,
    ...useQueryAdminOptions,
  });

  const { data: inDepartmentData, isLoading: isLoadingDepartment } = useQuery({
    queryKey: ['inDepartment', department?.data?.id, false],

    queryFn: () =>
      CathedraAPI.getDepartmentTeachers({
        cathedrasId: [department?.data?.id ?? ''],
        notInDepartments: false,
      }),
    enabled: isSuccess,
    ...useQueryAdminOptions,
  });

  const faculties = useMemo(() => {
    if (!divisionData) return [];

    return divisionData.divisions.map(faculty => ({
      id: faculty,
      label: faculty,
    }));
  }, [divisionData]);

  const handleEdit = useCallback(async () => {
    if (!inDepartmentData || !department) return;

    try {
      const deleteTeachers = inDepartmentData.teachers.map(
        teacher => teacher.id,
      );
      const addTeachers = right.map(teacher => teacher.id);
      await CathedraAPI.editDepartment(department.data.id, {
        name,
        abbreviation,
        division,
        deleteTeachers,
        addTeachers,
      });
      toast.success('Кафедра успішно змінена!', '', 4000);
      router.replace('/admin/departments');
    } catch (e) {
      displayError(e);
    }
  }, [
    inDepartmentData,
    department,
    right,
    name,
    abbreviation,
    division,
    toast,
    router,
    displayError,
  ]);

  const handleDelete = async (departmentId: string) => {
    try {
      await CathedraAPI.deleteDepartment(departmentId);
      toast.success('Кафедра успішно видалена!', '', 4000);
      router.replace('/admin/departments');
    } catch (e) {
      displayError(e);
    }
  };

  if (isLoading || isLoadingDivisions || isLoadingDepartment)
    return <LoadPage />;

  if (!department || !divisionData || !inDepartmentData)
    throw new Error(`Something went wrong in department edit page`);

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
          value={name ?? ''}
          onChange={setName}
          size={InputSize.MEDIUM}
          type={InputType.DEFAULT}
          showRemark={false}
          label="Назва кафедри"
        />
        <Input
          value={abbreviation ?? ''}
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
          value={division ?? ''}
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
