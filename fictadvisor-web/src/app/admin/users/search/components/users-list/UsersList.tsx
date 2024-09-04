'use client';
import React, { FC } from 'react';
import { UserForGetAllResponse } from '@fictadvisor/utils/responses';
import { Avatar, Box, TableHead, Typography } from '@mui/material';
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
import Tag from '@/components/common/ui/tag';
import { TagSize } from '@/components/common/ui/tag/types';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import UserAPI from '@/lib/api/user/UserAPI';

import { TagColorMapper, TagTextMapper } from '../../constants';

import TableActions from './components/table-actions';
import * as styles from './UsersList.styles';

interface UsersListProps {
  currPage: number;
  setCurrPage: React.Dispatch<React.SetStateAction<number>>;
  users: UserForGetAllResponse[];
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  totalCount: number;
}

const UsersList: FC<UsersListProps> = ({
  currPage,
  setCurrPage,
  users,
  pageSize,
  setPageSize,
  totalCount,
}) => {
  const qc = useQueryClient();

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
      await UserAPI.delete(userId);
      await qc.refetchQueries({ queryKey: ['users', currPage, pageSize] });
      toast.success('Користувача видалено успішно');
    } catch (e) {
      displayError(e);
    }
  };

  return (
    <TableContainer component={Paper} sx={stylesAdmin.tableContainer}>
      <Table sx={stylesAdmin.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Username</TableCell>
            <TableCell align="left">Пошта</TableCell>
            <TableCell align="left">Стан користувача</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell align="left" scope="row">
                <Box sx={styles.usernameWrapper}>
                  <Avatar
                    src={user.avatar ?? '/images/frog-avatar.png'}
                    alt="Картинка профілю"
                    sx={stylesAdmin.avatar}
                  />
                  <Typography variant="body2">{user.username}</Typography>
                </Box>
              </TableCell>
              <TableCell align="left">{user.email}</TableCell>
              <TableCell align="left">
                <Tag
                  text={TagTextMapper[user.state]}
                  size={TagSize.SMALL}
                  color={TagColorMapper[user.state]}
                />
              </TableCell>
              <TableCell align="right" sx={stylesAdmin.actionsWrapper}>
                <TableActions user={user} handleDelete={handleDelete} />
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
export default UsersList;
