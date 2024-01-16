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
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import GrantsAPI from '@/lib/api/grants/GrantsAPI';
import { Grant } from '@/types/role';

import * as styles from './GrantsList.styles';

interface GrantsListProps {
  curPage: number;
  setCurPage: React.Dispatch<React.SetStateAction<number>>;
  grants: Grant[];
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  totalCount: number;
  refetch: QueryObserverBaseResult['refetch'];
  roleId: string;
}

const GrantsList: FC<GrantsListProps> = ({
  curPage,
  setCurPage,
  grants,
  pageSize,
  setPageSize,
  totalCount,
  refetch,
  roleId,
}) => {
  const toastError = useToastError();
  const toast = useToast();
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPageSize(parseInt(event.target.value, 10));
    setCurPage(0);
  };

  const handleDelete = async (grantId: string) => {
    try {
      await GrantsAPI.delete(roleId, grantId);
      await refetch();
      toast.success('Право видалено успішно');
    } catch (e) {
      if (isAxiosError(e)) {
        toastError.displayError(e);
      }
    }
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setCurPage(newPage);
  };
  return (
    <TableContainer component={Paper} sx={styles.tableContainer}>
      <Table sx={styles.table} aria-label="simple table">
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
                <TableCell align="right" sx={styles.actionsWrapper}>
                  <Box sx={styles.actions}>
                    <Link
                      href={`/admin/roles/${roleId}/grants/edit/${grant.id}`}
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
                      onClick={() => handleDelete(grant.id)}
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
export default GrantsList;
