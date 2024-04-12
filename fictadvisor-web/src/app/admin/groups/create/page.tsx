'use client';

import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';

import { useQueryAdminOptions } from '@/app/admin/common/constants';
import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import { getYearOptions } from '@/app/admin/groups/common/utils/getYearOptions';
import HeaderCreate from '@/app/admin/groups/create/components/header-create';
import { Dropdown, InputSize } from '@/components/common/ui/form';
import { FieldSize } from '@/components/common/ui/form/common/types';
import Input from '@/components/common/ui/form/input-mui';
import Progress from '@/components/common/ui/progress';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import CathedraAPI from '@/lib/api/cathedras/CathedraAPI';
import EduprogramAPI from '@/lib/api/eduprogram/EduprogramAPI';
import GroupAPI from '@/lib/api/group/GroupAPI';
import mergeSx from '@/lib/utils/MergeSxStylesUtil';

const AdminCreateStudentPage = () => {
  const toast = useToast();
  const { displayError } = useToastError();
  const router = useRouter();

  const [code, setCode] = useState<string>('');
  const [admissionYear, setAdmissionYear] = useState<number>(
    new Date().getFullYear(),
  );
  const [eduProgramId, setEduProgramId] = useState<string>('');
  const [cathedraId, setCathedraId] = useState<string>('');

  const { data: eduprogramsData, isLoading: isLoadingEduprograms } = useQuery(
    ['eduprograms'],
    () => EduprogramAPI.getAll(),
    useQueryAdminOptions,
  );
  const { data: cathedrasData, isLoading: isLoadingCathedras } = useQuery(
    ['cathedras'],
    () => CathedraAPI.getAll(),
    useQueryAdminOptions,
  );

  if (isLoadingCathedras || isLoadingEduprograms) return <Progress />;

  if (!cathedrasData || !eduprogramsData) throw new Error('error loading data');

  const handleCreateSubmit = async () => {
    try {
      await GroupAPI.create({
        code,
        eduProgramId,
        cathedraId,
        admissionYear,
      });
      toast.success('Група успішно створена!', '', 4000);
      router.replace('/admin/groups');
    } catch (e) {
      displayError(e);
    }
  };

  const cathedrasOptions = cathedrasData.cathedras.map(cathedra => ({
    id: cathedra.id,
    label: cathedra.abbreviation,
  }));
  const eduprogramsOptions = eduprogramsData.programs.map(program => ({
    label: program.name,
    id: program.id,
  }));

  return (
    <Box sx={{ p: '16px' }}>
      <HeaderCreate handleCreateSubmit={handleCreateSubmit} />
      <Box
        sx={mergeSx(stylesAdmin.infoWrapper, { maxWidth: '344px', pt: '24px' })}
      >
        <Input
          size={InputSize.MEDIUM}
          sx={stylesAdmin.input}
          label="Назва"
          placeholder="Назва"
          value={code}
          onChange={setCode}
        />
        <Dropdown
          disableClearable
          size={FieldSize.MEDIUM}
          options={getYearOptions()}
          showRemark={false}
          onChange={(value: string) => setAdmissionYear(+value)}
          value={admissionYear.toString()}
          label="Рік вступу"
          placeholder="Рік вступу"
        />
        <Dropdown
          disableClearable
          size={FieldSize.MEDIUM}
          options={eduprogramsOptions}
          showRemark={false}
          onChange={setEduProgramId}
          value={eduProgramId}
          label="Освітня програма"
          placeholder="Освітня програма"
        />
        <Dropdown
          disableClearable
          size={FieldSize.MEDIUM}
          options={cathedrasOptions}
          showRemark={false}
          onChange={setCathedraId}
          value={cathedraId}
          label="Кафедра"
          placeholder="Кафедра"
        />
      </Box>
    </Box>
  );
};

export default AdminCreateStudentPage;
