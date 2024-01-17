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
import { TagSize } from '@/components/common/ui/tag/types';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import StudentAPI from '@/lib/api/student/StudentAPI';
import { GroupStudent } from '@/types/student';

import {
  TagColorMapper,
  TagTextMapper,
} from '../../constants/StudentSearchConstants';

import * as styles from './StudentsList.styles';

interface StudentsListProps {
  curPage: number;
  setCurPage: React.Dispatch<React.SetStateAction<number>>;
  students: GroupStudent[];
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  totalCount: number;
  refetch: QueryObserverBaseResult['refetch'];
}

const StudentsList: FC<StudentsListProps> = ({
  curPage,
  setCurPage,
  students,
  pageSize,
  setPageSize,
  totalCount,
  refetch,
}) => {
  const toastError = useToastError();
  const toast = useToast();

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPageSize(parseInt(event.target.value, 10));
    setCurPage(0);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setCurPage(newPage);
  };
  const handleDelete = async (userId: string) => {
    try {
      await StudentAPI.delete(userId);
      await refetch();
      toast.success('Студента видалено успішно');
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
            <TableCell align="left">ПІБ</TableCell>
            <TableCell align="left">Група</TableCell>
            <TableCell align="left">Роль у групі</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map(student => (
            <TableRow key={student.id}>
              <TableCell align="left" scope="row">
                <Typography variant="body2">{`${student.firstName} ${student.middleName} ${student.lastName}`}</Typography>
              </TableCell>
              <TableCell align="left">{student.group.code}</TableCell>
              <TableCell align="left">
                <Tag
                  text={TagTextMapper[student.group.role]}
                  size={TagSize.SMALL}
                  color={TagColorMapper[student.group.role]}
                />
              </TableCell>
              <TableCell align="right" sx={styles.actionsWrapper}>
                <Box sx={styles.actions}>
                  <Link
                    href={`/admin/students/edit/${student.id}`}
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
                    onClick={() => handleDelete(student.id)}
                  />
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter></TableFooter>
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
export default StudentsList;
