import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Grid from '@mui/material/Grid';
import { isAxiosError } from 'axios';

import SideList from '@/components/common/ui/form/transfer-list/components/SideList';
import {
  filterChecked,
  intersection,
} from '@/components/common/ui/form/transfer-list/utils';
import {
  IconButton,
  IconButtonShape,
  IconButtonSize,
} from '@/components/common/ui/icon-button';
import { IconButtonColor } from '@/components/common/ui/icon-button-mui/types';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import CathedraAPI from '@/lib/api/cathera/CathedraAPI';
import TeacherAPI from '@/lib/api/teacher/TeacherAPI';
import { Teacher } from '@/types/teacher';

import * as styles from './TransferList.styles';

interface TransferListProps {
  cathedraId: string;
  rightList: Teacher[];
  leftList: Teacher[];
  onRightListChange: (list: Teacher[]) => void;
  onLeftListChange: (list: Teacher[]) => void;
  count?: number;
  page?: number;
}

const TransferList: FC<TransferListProps> = ({
  cathedraId,
  rightList,
  leftList,
  onRightListChange,
  onLeftListChange,
}) => {
  const toast = useToastError();

  const [checked, setChecked] = useState<Teacher[]>([]);
  const [left, setLeft] = useState<Teacher[]>(leftList);
  const [right, setRight] = useState<Teacher[]>(rightList);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
  useEffect(() => {
    onRightListChange(right);
    onLeftListChange(left);
  }, [right, left]);
  const { data: notInDepartmentData, isSuccess: isNotInDepartmentSuccess } =
    useQuery(
      'notInDepartment',
      () => CathedraAPI.getDepartmentTeachers(cathedraId, true),
      {
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        onSuccess: data => {
          setLeft(data.teachers);
        },
        onError: error => {
          if (isAxiosError(error) && !left) {
            setLeft([]);
          }
        },
      },
    );

  const { data: inDepartmentData, isSuccess: isInDepartmentSuccess } = useQuery(
    'inDepartment',
    () => CathedraAPI.getDepartmentTeachers(cathedraId, false),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      onSuccess: data => {
        setRight(data.teachers);
      },
      onError: error => {
        if (isAxiosError(error)) {
          setRight([]);
        }
      },
    },
  );

  const { data, isSuccess, refetch } = useQuery(
    'teachers',
    () => TeacherAPI.getAdminAll({}),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      onSuccess: data => {
        if (!cathedraId) {
          setLeft(data.teachers);
        }
      },
      onError: error => {
        if (isAxiosError(error)) {
          toast.displayError(error.response?.data.message);
        }
      },
    },
  );

  if (!isSuccess) return <div>Loading...</div>;

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(filterChecked(left, leftChecked));
    setChecked(filterChecked(checked, leftChecked));
    onRightListChange(right);
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(filterChecked(right, rightChecked));
    setChecked(filterChecked(checked, rightChecked));
    onLeftListChange(left);
  };

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>
        <SideList
          teachers={left}
          title="Не на кафедрі"
          checked={checked}
          onCheck={setChecked}
        />
      </Grid>
      <Grid item>
        <Grid container sx={styles.transferButtons}>
          <IconButton
            icon={<ChevronRightIcon />}
            shape={IconButtonShape.SQUARE}
            color={IconButtonColor.SECONDARY}
            size={IconButtonSize.MEDIUM}
            onClick={handleCheckedRight}
          ></IconButton>
          <IconButton
            icon={<ChevronLeftIcon />}
            shape={IconButtonShape.SQUARE}
            color={IconButtonColor.SECONDARY}
            size={IconButtonSize.MEDIUM}
            onClick={handleCheckedLeft}
          ></IconButton>
        </Grid>
      </Grid>
      <Grid item>
        <SideList
          teachers={right}
          title="На кафедрі"
          checked={checked}
          onCheck={setChecked}
        />
      </Grid>
    </Grid>
  );
};

export default TransferList;
