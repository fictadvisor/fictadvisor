import React, { FC } from 'react';
import { QueryObserverBaseResult } from 'react-query';
import { Table, TableCell, TableHead, TableRow } from '@mui/material';
import { isAxiosError } from 'axios';

import { useToastError } from '@/hooks/use-toast-error/useToastError';
import SubjectAPI from '@/lib/api/subject/SubjectAPI';
import { Subject } from '@/types/subject';

import TableActions from './components/table-actions';
import * as styles from './AdminSubjectTable.styles';

interface SubjectsAdminSearchProps {
  subjects?: Subject[];
  isLoading: boolean;
  refetch: QueryObserverBaseResult['refetch'];
}
const AdminSubjectTable: FC<SubjectsAdminSearchProps> = ({
  subjects,
  isLoading,
  refetch,
}) => {
  const toast = useToastError();
  const handleDelete = async (subjectId: string) => {
    try {
      await SubjectAPI.delete(subjectId);
      await refetch();
    } catch (e) {
      if (isAxiosError(e)) {
        toast.displayError(e);
      }
    }
  };

  return (
    <Table>
      <TableHead>
        <TableCell sx={styles.tableHeadItem}>Предмет</TableCell>
        <TableCell sx={styles.tableHeadItem} />
      </TableHead>
      {!isLoading &&
        subjects?.map((subject, index) => (
          <TableRow key={index}>
            <TableCell sx={styles.tableBodyItem}>{subject.name}</TableCell>
            <TableCell sx={styles.tableBodyItem}>
              <TableActions subject={subject} handleDelete={handleDelete} />
            </TableCell>
          </TableRow>
        ))}
    </Table>
  );
};

export default AdminSubjectTable;
