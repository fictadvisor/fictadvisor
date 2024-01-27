'use client';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Box } from '@mui/material';
import { isAxiosError } from 'axios';

import { Dropdown } from '@/components/common/ui/form';
import { FieldSize } from '@/components/common/ui/form/common/types';
import Input from '@/components/common/ui/form/input-mui';
import { InputSize } from '@/components/common/ui/form/input-mui/types';
import Progress from '@/components/common/ui/progress';
import { GroupEditBody } from '@/components/pages/admin/admin-groups/common/types';
import { getYearOptions } from '@/components/pages/admin/admin-groups/common/utils/getYearOptions';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import CathedraAPI from '@/lib/api/cathedras/CathedraAPI';
import EduprogramAPI from '@/lib/api/eduprogram/EduprogramAPI';
import { GroupStudent } from '@/types/student';

import * as styles from './GroupInfoInputs.styles';

interface GroupInfoInputsProps {
  groupInfo: GroupEditBody;
  students: GroupStudent[];
  setGroupInfo: React.Dispatch<React.SetStateAction<GroupEditBody>>;
}

const GroupInfoInputs: FC<GroupInfoInputsProps> = ({
  groupInfo,
  setGroupInfo,
  students,
}) => {
  const toastError = useToastError();
  const [code, setCode] = useState<string>(groupInfo.code);
  const [admissionYear, setAdmissionYear] = useState<number>(
    groupInfo.admissionYear,
  );
  const [eduProgramId, setEduProgramId] = useState<string>(
    groupInfo.eduProgramId,
  );
  const [cathedraId, setCathedraId] = useState<string>(groupInfo.cathedraId);

  const [captainId, setCaptainId] = useState<string>(groupInfo.captainId);

  const { data: eduprogramsData, isLoading: isLoadingEduprograms } = useQuery(
    'eduprograms',
    () => EduprogramAPI.getAll(),
    {
      onError: error => {
        if (isAxiosError(error)) {
          toastError.displayError(error.response?.data.message);
        }
      },
    },
  );
  const { data: cathedrasData, isLoading } = useQuery(
    'cathedras',
    () => CathedraAPI.getAll(),
    {
      onError: error => {
        if (isAxiosError(error)) {
          toastError.displayError(error.response?.data.message);
        }
      },
    },
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setGroupInfo(prev => ({
        ...prev,
        code,
        admissionYear,
        eduProgramId,
        captainId,
        cathedraId,
      }));
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [code, admissionYear, eduProgramId, captainId, cathedraId]);

  if (!cathedrasData || isLoading || isLoadingEduprograms || !eduprogramsData)
    return <Progress />;

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
        sx={styles.input}
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
        value={admissionYear.toString()}
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
