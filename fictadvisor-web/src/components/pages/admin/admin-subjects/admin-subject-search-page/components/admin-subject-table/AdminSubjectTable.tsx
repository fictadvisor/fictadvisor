import React, { FC } from 'react';
import { Table, TableCell, TableHead, TableRow } from '@mui/material';

import { Subject } from '@/types/subject';

import TableActions from './components/table-actions';
import * as styles from './AdminSubjectTable.styles';

interface SubjectsAdminSearchProps {
  subjects: Subject[];
  handleDelete: (subjectId: string) => Promise<void>;
}
const AdminSubjectTable: FC<SubjectsAdminSearchProps> = ({
  subjects,
  handleDelete,
}) => {
  return (
    <Table>
      <TableHead>
        <TableCell sx={styles.tableHeadItem}>Предмет</TableCell>
        <TableCell sx={styles.tableHeadItem} />
      </TableHead>
      {subjects?.map(subject => (
        <TableRow key={subject.id}>
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
