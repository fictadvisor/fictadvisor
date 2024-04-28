import React, { FC } from 'react';
import { SubjectCountResponse } from '@fictadvisor/utils/responses';
import { Table, TableCell, TableHead, TableRow } from '@mui/material';

import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';

import TableActions from './components/table-actions';

interface SubjectsAdminSearchProps {
  subjects: SubjectCountResponse[];
  handleDelete: (subjectId: string) => Promise<void>;
}
const AdminSubjectTable: FC<SubjectsAdminSearchProps> = ({
  subjects,
  handleDelete,
}) => {
  return (
    <Table>
      <TableHead>
        <TableCell sx={stylesAdmin.headItem}>Предмет</TableCell>
        <TableCell sx={stylesAdmin.headItem} />
      </TableHead>
      {subjects.map(subject => (
        <TableRow key={subject.id}>
          <TableCell sx={stylesAdmin.bodyItem}>{subject.name}</TableCell>
          <TableCell sx={stylesAdmin.bodyItem}>
            <TableActions subject={subject} handleDelete={handleDelete} />
          </TableCell>
        </TableRow>
      ))}
    </Table>
  );
};

export default AdminSubjectTable;
