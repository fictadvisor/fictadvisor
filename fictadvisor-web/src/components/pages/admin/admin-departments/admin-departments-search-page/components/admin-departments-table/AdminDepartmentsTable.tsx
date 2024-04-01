import React, { FC } from 'react';
import { Table, TableCell, TableHead, TableRow } from '@mui/material';

import { CathedraColors } from '@/components/common/ui/cards/card-roles/CardRoles';
import Tag from '@/components/common/ui/tag';
import { TagSize, TagVariant } from '@/components/common/ui/tag/types';
import { Cathedra } from '@/lib/api/cathera/types/GetAllResponse';

import TableActions from './components/table-actions';
import * as styles from './AdminDepartmentsTable.styles';

interface AdminDepartmentsSearchProps {
  departments: Cathedra[];
  handleDelete: (departmentId: string) => Promise<void>;
}

const AdminDepartmentsTable: FC<AdminDepartmentsSearchProps> = ({
  departments,
  handleDelete,
}) => {
  return (
    <Table>
      <TableHead>
        <TableCell sx={styles.headItem}>Назва кафедри</TableCell>
        <TableCell sx={styles.headItem}>Абревіатура</TableCell>
        <TableCell sx={styles.headItem}>Факультет</TableCell>
        <TableCell sx={styles.headItem}>Кількість викладачів</TableCell>
        <TableCell sx={styles.headItem} />
      </TableHead>
      {departments.map(department => (
        <TableRow key={department.id}>
          <TableCell sx={styles.bodyItem}>{department.name}</TableCell>
          <TableCell sx={styles.bodyItem}>
            <Tag
              key={department.id}
              text={department.abbreviation}
              variant={TagVariant.OUTLINE}
              color={CathedraColors[department.abbreviation]}
              size={TagSize.SMALL}
              sx={styles.tag}
            />
          </TableCell>
          <TableCell sx={styles.bodyItem}>{department.division}</TableCell>
          <TableCell sx={styles.bodyItem}>{department.teachers}</TableCell>
          <TableCell sx={styles.bodyItem}>
            <TableActions handleDelete={handleDelete} department={department} />
          </TableCell>
        </TableRow>
      ))}
    </Table>
  );
};

export default AdminDepartmentsTable;
