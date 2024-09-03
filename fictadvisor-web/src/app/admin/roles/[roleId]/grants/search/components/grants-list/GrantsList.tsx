'use client';
import React, { FC } from 'react';
import { MappedGrant } from '@fictadvisor/utils/responses';
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
import { useQueryClient } from '@tanstack/react-query';

import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import GrantsAPI from '@/lib/api/grants/GrantsAPI';

import TableActions from './components/table-actions';

interface GrantsListProps {
  currPage: number;
  setCurrPage: React.Dispatch<React.SetStateAction<number>>;
  grants: MappedGrant[];
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  totalCount: number;
  roleId: string;
}

const GrantsList: FC<GrantsListProps> = ({
  currPage,
  setCurrPage,
  grants,
  pageSize,
  setPageSize,
  totalCount,
  roleId,
}) => {
  const qc = useQueryClient();
  const toastError = useToastError();
  const toast = useToast();
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPageSize(parseInt(event.target.value, 10));
    setCurrPage(0);
  };

  const handleDelete = async (grantId: string) => {
    try {
      await GrantsAPI.delete(roleId, grantId);
      await qc.refetchQueries({
        queryKey: ['allGrantsByRoleId', currPage, pageSize],
      });
      toast.success('Право видалено успішно');
    } catch (e) {
      toastError.displayError(e);
    }
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setCurrPage(newPage);
  };
  return (
    <TableContainer component={Paper} sx={stylesAdmin.tableContainer}>
      <Table sx={stylesAdmin.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Назва права</TableCell>
            <TableCell align="left">Вага</TableCell>
            <TableCell align="left">Статус права</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {grants &&
            grants.map(grant => (
              <TableRow key={grant.id}>
                <TableCell align="left" scope="row">
                  <Typography variant="body2">{grant.permission}</Typography>
                </TableCell>
                <TableCell align="left">{grant.weight}</TableCell>
                <TableCell align="left" scope="row">
                  <Typography variant="body2">
                    {grant.set ? 'Надане' : 'Забране'}
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={stylesAdmin.actionsWrapper}>
                  <TableActions
                    grant={grant}
                    roleId={roleId}
                    handleDelete={handleDelete}
                  />
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
export default GrantsList;
