'use client';
import React, { FC } from 'react';
import { SimpleStudentResponse } from '@fictadvisor/utils/responses';
import { TableHead, Typography } from '@mui/material';
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
import { QueryObserverBaseResult } from '@tanstack/react-query';

import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import Tag from '@/components/common/ui/tag';
import { TagSize } from '@/components/common/ui/tag/types';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import StudentAPI from '@/lib/api/student/StudentAPI';

import { TagColorMapper, TagTextMapper } from '../../constants';

import TableActions from './components/table-actions';

interface StudentsListProps {
  currPage: number;
  setCurrPage: React.Dispatch<React.SetStateAction<number>>;
  students: SimpleStudentResponse[];
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  totalCount: number;
  refetch: QueryObserverBaseResult['refetch'];
}

const StudentsList: FC<StudentsListProps> = ({
  currPage,
  setCurrPage,
  students,
  pageSize,
  setPageSize,
  totalCount,
  refetch,
}) => {
  const { displayError } = useToastError();
  const toast = useToast();

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPageSize(parseInt(event.target.value, 10));
    setCurrPage(0);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setCurrPage(newPage);
  };
  const handleDelete = async (userId: string) => {
    try {
      await StudentAPI.delete(userId);
      await refetch();
      toast.success('Студента видалено успішно');
    } catch (e) {
      displayError(e);
    }
  };

  return (
    <TableContainer component={Paper} sx={stylesAdmin.tableContainer}>
      <Table sx={stylesAdmin.table} aria-label="simple table">
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
              <TableCell align="left">{student.group?.code}</TableCell>
              <TableCell align="left">
                <Tag
                  text={TagTextMapper[student.role]}
                  size={TagSize.SMALL}
                  color={TagColorMapper[student.role]}
                />
              </TableCell>
              <TableCell align="right" sx={stylesAdmin.actionsWrapper}>
                <TableActions handleDelete={handleDelete} student={student} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter />
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
export default StudentsList;
