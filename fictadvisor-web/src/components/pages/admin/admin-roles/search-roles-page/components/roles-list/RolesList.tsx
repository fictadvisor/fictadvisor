'use client';
import React, { FC } from 'react';
import { QueryObserverBaseResult } from 'react-query';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Box, Link, TableHead, Typography } from '@mui/material';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from '@mui/material';
import { isAxiosError } from 'axios';
import NextLink from 'next/link';

import Button from '@/components/common/ui/button';
import {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import { IconButtonShape } from '@/components/common/ui/icon-button';
import IconButton from '@/components/common/ui/icon-button-mui';
import { IconButtonColor } from '@/components/common/ui/icon-button-mui/types';
import Tag from '@/components/common/ui/tag';
import { TagSize } from '@/components/common/ui/tag/types';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import RoleAPI from '@/lib/api/role/RoleAPI';
import { Role } from '@/types/role';

import {
  TagColorMapper,
  TagTextMapper,
} from '../../../common/constants/RolesSearchConstants';

import * as styles from './RolesList.styles';

interface RolesListProps {
  curPage: number;
  setCurPage: React.Dispatch<React.SetStateAction<number>>;
  roles: Role[];
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  totalCount: number;
  refetch: QueryObserverBaseResult['refetch'];
}

const RolesList: FC<RolesListProps> = ({
  curPage,
  setCurPage,
  roles,
  pageSize,
  setPageSize,
  totalCount,
  refetch,
}) => {
  const handleChangePage = (event: unknown, newPage: number) => {
    setCurPage(newPage);
  };
  const toastError = useToastError();
  const toast = useToast();
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPageSize(parseInt(event.target.value, 10));
    setCurPage(0);
  };

  const handleDelete = async (userId: string) => {
    try {
      await RoleAPI.delete(userId);
      await refetch();
      toast.success('Роль видалено успішно');
    } catch (e) {
      if (isAxiosError(e)) {
        toastError.displayError(e.response?.data.message);
      }
    }
  };

  return (
    <TableContainer component={Paper} sx={styles.tableContainer}>
      <Table sx={styles.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">ID</TableCell>
            <TableCell align="left">Відображуване ім’я</TableCell>
            <TableCell align="left">Тип ролі</TableCell>
            <TableCell align="left">Вага</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roles.map(role => (
            <TableRow key={role.id}>
              <TableCell align="left" scope="row">
                <Typography variant="body2">{role.id}</Typography>
              </TableCell>
              <TableCell align="left">{role.displayName}</TableCell>
              <TableCell align="left">
                <Tag
                  text={TagTextMapper[role.name]}
                  size={TagSize.SMALL}
                  color={TagColorMapper[role.name]}
                />
              </TableCell>
              <TableCell align="left" scope="row">
                <Typography variant="body2">{role.weight}</Typography>
              </TableCell>
              <TableCell align="right" sx={styles.actionsWrapper}>
                <Box sx={styles.actions}>
                  <Link
                    href="/admin/grants"
                    component={NextLink}
                    underline="none"
                    color="inherit"
                  >
                    <Button
                      size={ButtonSize.SMALL}
                      variant={ButtonVariant.FILLED}
                      text="Права"
                    />
                  </Link>
                  <Link
                    href={`/admin/roles/edit/${role.id}`}
                    component={NextLink}
                    underline="none"
                    color="inherit"
                  >
                    <Button
                      size={ButtonSize.SMALL}
                      startIcon={<PencilSquareIcon width={24} height={24} />}
                      variant={ButtonVariant.OUTLINE}
                      text="Редагувати"
                    />
                  </Link>
                  <IconButton
                    icon={<TrashIcon width={24} height={24} />}
                    sx={styles.trashIcon}
                    color={IconButtonColor.SECONDARY}
                    shape={IconButtonShape.CIRCLE}
                    onClick={() => handleDelete(role.id)}
                  />
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalCount}
        rowsPerPage={pageSize}
        page={curPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};
export default RolesList;
