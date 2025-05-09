'use client';
import { Dispatch, FC, SetStateAction, useCallback, useEffect } from 'react';
import { useState } from 'react';
import { RoleName } from '@fictadvisor/utils/enums';
import { UpdateGroupDTO } from '@fictadvisor/utils/requests';
import {
  MappedGroupResponse,
  OrdinaryStudentResponse,
} from '@fictadvisor/utils/responses';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { useQueryAdminOptions } from '@/app/admin/common/constants';
import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import { getYearOptions } from '@/app/admin/groups/common/utils/getYearOptions';
import { Dropdown } from '@/components/common/ui/form';
import { FieldSize } from '@/components/common/ui/form/common/types';
import Input from '@/components/common/ui/form/input-mui';
import { InputSize } from '@/components/common/ui/form/input-mui/types';
import Progress from '@/components/common/ui/progress';
import CathedraAPI from '@/lib/api/cathedras/CathedraAPI';
import EduprogramAPI from '@/lib/api/eduprogram/EduprogramAPI';

import * as styles from './GroupInfoInputs.styles';

interface GroupInfoInputsProps {
  group: MappedGroupResponse;
  students: OrdinaryStudentResponse[];
  setGroupInfo: Dispatch<SetStateAction<UpdateGroupDTO>>;
}

const GroupInfoInputs: FC<GroupInfoInputsProps> = ({
  group,
  setGroupInfo,
  students,
}) => {
  const [code, setCode] = useState<string>(group.code as string);
  const [admissionYear, setAdmissionYear] = useState<number>(
    group.admissionYear as number,
  );
  const [eduProgramId, setEduProgramId] = useState<string>(
    group.educationalProgramId as string,
  );
  const [cathedraId, setCathedraId] = useState<string>(
    group.cathedra.id as string,
  );

  const [captainId, setCaptainId] = useState<string>(group.captain.id);

  const { data: eduprogramsData, isLoading: isLoadingEduprograms } = useQuery({
    queryKey: ['eduprograms'],
    queryFn: () => EduprogramAPI.getAll(),
    ...useQueryAdminOptions,
  });
  const { data: cathedrasData, isLoading } = useQuery({
    queryKey: ['cathedras'],
    queryFn: () => CathedraAPI.getAll(),
    ...useQueryAdminOptions,
  });

  useEffect(() => {
    setGroupInfo(prev => ({
      ...prev,
      code,
      admissionYear,
      eduProgramId,
      captainId,
      cathedraId,
    }));
  }, [admissionYear, captainId, cathedraId, code, eduProgramId, setGroupInfo]);

  if (isLoading || isLoadingEduprograms) return <Progress />;

  if (!cathedrasData || !eduprogramsData)
    throw new Error('an erorr ocurred while loading edit groups page');

  const cathedrasOptions = cathedrasData.cathedras.map(cathedra => ({
    id: cathedra.id,
    label: cathedra.abbreviation,
  }));

  const studentsOptions = students.map(student => ({
    label: `${student.lastName} ${student.firstName} ${student.middleName}`,
    id: student.id,
  }));

  const eduprogramsOptions = eduprogramsData.programs.map(program => ({
    label: program.name,
    id: program.id,
  }));
  const yearOptions = getYearOptions();

  return (
    <Box sx={styles.inputsWrapper}>
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
        placeholder="Рік вступу"
        size={FieldSize.MEDIUM}
        options={yearOptions}
        showRemark={false}
        onChange={(value: string) => setAdmissionYear(+value)}
        value={admissionYear?.toString()}
        label="Рік вступу"
      />
      <Dropdown
        disableClearable
        placeholder="Освітня програма"
        size={FieldSize.MEDIUM}
        options={eduprogramsOptions}
        showRemark={false}
        onChange={setEduProgramId}
        value={eduProgramId}
        label="Освітня програма"
      />
      <Dropdown
        disableClearable
        placeholder="Кафедра"
        size={FieldSize.MEDIUM}
        options={cathedrasOptions}
        showRemark={false}
        onChange={setCathedraId}
        value={cathedraId}
        label="Кафедра"
      />
      <Dropdown
        disableClearable
        placeholder="Обери старосту"
        size={FieldSize.MEDIUM}
        options={studentsOptions}
        showRemark={false}
        onChange={setCaptainId}
        value={captainId}
        label="Староста"
      />
    </Box>
  );
};

export default GroupInfoInputs;
