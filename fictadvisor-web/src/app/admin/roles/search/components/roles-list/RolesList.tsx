'use client';
import React, { FC } from 'react';
import { QueryObserverBaseResult } from 'react-query';
import { RoleResponse } from '@fictadvisor/utils/responses';
import { TableHead, Typography } from '@mui/material';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from '@mui/material';

import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import {
  TagColorMapper,
  TagTextMapper,
} from '@/app/admin/roles/common/constants';
import Tag from '@/components/common/ui/tag';
import { TagSize } from '@/components/common/ui/tag/types';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import RoleAPI from '@/lib/api/role/RoleAPI';

import TableActions from './components/table-actions';

interface RolesListProps {
  currPage: number;
  setCurrPage: React.Dispatch<React.SetStateAction<number>>;
  roles: RoleResponse[];
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  totalCount: number;
  refetch: QueryObserverBaseResult['refetch'];
}

const RolesList: FC<RolesListProps> = ({
  currPage,
  setCurrPage,
  roles,
  pageSize,
  setPageSize,
  totalCount,
  refetch,
}) => {
  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrPage(newPage);
  };
  const { displayError } = useToastError();
  const toast = useToast();
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPageSize(parseInt(event.target.value, 10));
    setCurrPage(0);
  };

  const handleDelete = async (userId: string) => {
    try {
      await RoleAPI.delete(userId);
      await refetch();
      toast.success('Роль видалено успішно');
    } catch (e) {
      displayError(e);
    }
  };

  return (
    <TableContainer component={Paper} sx={stylesAdmin.tableContainer}>
      <Table sx={stylesAdmin.table} aria-label="simple table">
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
              <TableCell align="right" sx={stylesAdmin.actionsWrapper}>
                <TableActions handleDelete={handleDelete} role={role} />
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
        page={currPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};
export default RolesList;
