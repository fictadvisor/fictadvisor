import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import { TeacherWithRolesAndCathedrasResponse } from '@fictadvisor/utils/responses';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Grid from '@mui/material/Grid';
import { useQuery } from '@tanstack/react-query';

import { useQueryAdminOptions } from '@/app/admin/common/constants';
import SideList from '@/app/admin/departments/common/components/transfer-list/components/SideList';
import {
  filterChecked,
  intersection,
} from '@/app/admin/departments/common/components/transfer-list/utils';
import {
  IconButton,
  IconButtonShape,
  IconButtonSize,
} from '@/components/common/ui/icon-button';
import { IconButtonColor } from '@/components/common/ui/icon-button-mui/types';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import CathedraAPI from '@/lib/api/cathedras/CathedraAPI';
import TeacherAPI from '@/lib/api/teacher/TeacherAPI';

import * as styles from './TransferList.styles';

interface TransferListProps {
  cathedraId: string;
  rightList: TeacherWithRolesAndCathedrasResponse[];
  leftList: TeacherWithRolesAndCathedrasResponse[];
  onRightListChange: (list: TeacherWithRolesAndCathedrasResponse[]) => void;
  onLeftListChange: (list: TeacherWithRolesAndCathedrasResponse[]) => void;
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
  const [checked, setChecked] = useState<
    TeacherWithRolesAndCathedrasResponse[]
  >([]);
  const [left, setLeft] =
    useState<TeacherWithRolesAndCathedrasResponse[]>(leftList);
  const [right, setRight] =
    useState<TeacherWithRolesAndCathedrasResponse[]>(rightList);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  useEffect(() => {
    onRightListChange(right);
    onLeftListChange(left);
  }, [right, left]);

  const inDepartmentData = useQuery({
    queryKey: ['inDepartment', cathedraId, false],

    queryFn: () =>
      CathedraAPI.getDepartmentTeachers({
        cathedrasId: [cathedraId],
        notInDepartments: false,
      }),

    ...useQueryAdminOptions,
  });

  useEffect(() => {
    if (inDepartmentData.isSuccess) {
      setRight(inDepartmentData.data.teachers);
    }
    if (inDepartmentData.error) {
      setRight([]);
    }
  }, [inDepartmentData.data]);

  const { data, isSuccess, error } = useQuery({
    queryKey: ['notInDepartment', cathedraId, true],

    queryFn: () =>
      CathedraAPI.getDepartmentTeachers({
        cathedrasId: [cathedraId],
        notInDepartments: true,
      }),

    ...useQueryAdminOptions,
  });

  useEffect(() => {
    if (isSuccess && inDepartmentData.isSuccess) {
      setLeft(filterChecked(data.teachers, inDepartmentData.data.teachers));
    }
    if (error) {
      !left ? setLeft([]) : null;
    }
  }, [data, inDepartmentData.data]);

  const teachersData = useQuery({
    queryKey: ['teachers'],
    queryFn: () => TeacherAPI.getAll(),
    ...useQueryAdminOptions,
  });

  useEffect(() => {
    if (teachersData.isSuccess) {
      !cathedraId ? setLeft(teachersData.data.teachers) : null;
    }

    if (teachersData.error) {
      toast.displayError(error);
    }
  }, [teachersData.data]);

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
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      padding="16px"
    >
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
          />
          <IconButton
            icon={<ChevronLeftIcon />}
            shape={IconButtonShape.SQUARE}
            color={IconButtonColor.SECONDARY}
            size={IconButtonSize.MEDIUM}
            onClick={handleCheckedLeft}
          />
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
