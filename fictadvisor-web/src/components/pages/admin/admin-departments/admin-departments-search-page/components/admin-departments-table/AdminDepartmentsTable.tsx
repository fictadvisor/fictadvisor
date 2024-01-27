import React, { FC } from 'react';
import { QueryObserverBaseResult } from 'react-query';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Box, Table, TableCell, TableHead, TableRow } from '@mui/material';
import { isAxiosError } from 'axios';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import { CathedraColors } from '@/components/common/ui/cards/card-roles/CardRoles';
import IconButton from '@/components/common/ui/icon-button-mui';
import {
  IconButtonColor,
  IconButtonShape,
} from '@/components/common/ui/icon-button-mui/types';
import Tag from '@/components/common/ui/tag';
import { TagSize, TagVariant } from '@/components/common/ui/tag/types';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import CathedraAPI from '@/lib/api/cathera/CathedraAPI';
import { Cathedra } from '@/lib/api/cathera/types/GetAllResponse';

import * as styles from './AdminDepartmentsTable.styles';

interface AdminDepartmentsSearchProps {
  departments?: Cathedra[];
  isLoading: boolean;
  refetch: QueryObserverBaseResult['refetch'];
}

const AdminDepartmentsTable: FC<AdminDepartmentsSearchProps> = ({
  departments,
  isLoading,
  refetch,
}) => {
  const toast = useToastError();
  const handleDelete = async (departmentId: string) => {
    try {
      await CathedraAPI.deleteDepartment(departmentId);
      await refetch();
    } catch (e) {
      if (isAxiosError(e)) {
        toast.displayError(e.response?.data.message);
      }
    }
  };
  return (
    <Table>
      <TableHead>
        <TableCell sx={styles.headItem}>Назва кафедри</TableCell>
        <TableCell sx={styles.headItem}>Абревіатура</TableCell>
        <TableCell sx={styles.headItem}>Факультет</TableCell>
        <TableCell sx={styles.headItem}>Кількість викладачів</TableCell>
        <TableCell sx={styles.headItem} />
      </TableHead>
      {!isLoading &&
        departments?.map((department, index) => (
          <TableRow key={index}>
            <TableCell sx={styles.bodyItem}>{department.name}</TableCell>
            <TableCell sx={styles.bodyItem}>
              <Tag
                key={department.id}
                text={department.abbreviation}
                variant={TagVariant.OUTLINE}
                color={CathedraColors[department.abbreviation]}
                size={TagSize.SMALL}
                sx={styles.tag}
              />
            </TableCell>
            <TableCell sx={styles.bodyItem}>{department.division}</TableCell>
            <TableCell sx={styles.bodyItem}>{department.teachers}</TableCell>
            <TableCell sx={styles.bodyItem}>
              <Box sx={styles.buttonSection}>
                <Button
                  sx={styles.button}
                  text="Редагувати"
                  size={ButtonSize.SMALL}
                  variant={ButtonVariant.OUTLINE}
                  startIcon={<PencilSquareIcon />}
                  href={`/admin/departments/edit/${department.id}`}
                />
                <IconButton
                  onClick={() => handleDelete(department.id)}
                  icon={<TrashIcon />}
                  shape={IconButtonShape.CIRCLE}
                  color={IconButtonColor.ERROR}
                />
              </Box>
            </TableCell>
          </TableRow>
        ))}
    </Table>
  );
};

export default AdminDepartmentsTable;
