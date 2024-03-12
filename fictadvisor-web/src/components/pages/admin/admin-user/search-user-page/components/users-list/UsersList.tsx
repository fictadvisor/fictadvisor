'use client';
import React, { FC, ReactNode, useState } from 'react';
import { QueryObserverBaseResult } from 'react-query';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Avatar, Box, Link, TableHead, Typography } from '@mui/material';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
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
import { TagColor, TagSize } from '@/components/common/ui/tag/types';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import UserAPI from '@/lib/api/user/UserAPI';
import { UserAdmin } from '@/types/user';

import {
  TagColorMapper,
  TagTextMapper,
} from '../../constants/UserSearchConstants';

import * as styles from './UsersList.styles';

interface UsersListProps {
  curPage: number;
  setCurPage: React.Dispatch<React.SetStateAction<number>>;
  users: UserAdmin[];
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  totalCount: number;
  refetch: QueryObserverBaseResult['refetch'];
}

const UsersList: FC<UsersListProps> = ({
  curPage,
  setCurPage,
  users,
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
      await UserAPI.delete(userId);
      await refetch();
      toast.success('Користувача видалено успішно');
    } catch (e) {
      if (isAxiosError(e)) {
        toastError.displayError(e);
      }
    }
  };

  return (
    <TableContainer component={Paper} sx={styles.tableContainer}>
      <Table sx={styles.table} aria-label="simple table">
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
                    sx={styles.avatar}
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
              <TableCell align="right" sx={styles.actionsWrapper}>
                <Box sx={styles.actions}>
                  <Link
                    href={`/admin/users/edit/${user.id}`}
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
                    onClick={() => handleDelete(user.id)}
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
export default UsersList;
