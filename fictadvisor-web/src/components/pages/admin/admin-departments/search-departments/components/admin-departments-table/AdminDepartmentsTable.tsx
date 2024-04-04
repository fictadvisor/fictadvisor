import React, { FC } from 'react';
import { Table, TableCell, TableHead, TableRow } from '@mui/material';

import { CathedraColors } from '@/components/common/ui/cards/card-roles/CardRoles';
import Tag from '@/components/common/ui/tag';
import { TagSize, TagVariant } from '@/components/common/ui/tag/types';
import * as stylesAdmin from '@/components/pages/admin/common/styles/AdminPages.styles';
import { Cathedra } from '@/types/cathedra';

import TableActions from './components/table-actions';

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
        <TableCell sx={stylesAdmin.headItem}>Назва кафедри</TableCell>
        <TableCell sx={stylesAdmin.headItem}>Абревіатура</TableCell>
        <TableCell sx={stylesAdmin.headItem}>Факультет</TableCell>
        <TableCell sx={stylesAdmin.headItem}>Кількість викладачів</TableCell>
        <TableCell sx={stylesAdmin.headItem} />
      </TableHead>
      {departments.map(department => (
        <TableRow key={department.id}>
          <TableCell sx={stylesAdmin.bodyItem}>{department.name}</TableCell>
          <TableCell sx={stylesAdmin.bodyItem}>
            <Tag
              key={department.id}
              text={department.abbreviation}
              variant={TagVariant.OUTLINE}
              color={CathedraColors[department.abbreviation]}
              size={TagSize.SMALL}
              sx={stylesAdmin.tag}
            />
          </TableCell>
          <TableCell sx={stylesAdmin.bodyItem}>{department.division}</TableCell>
          <TableCell sx={stylesAdmin.bodyItem}>{department.teachers}</TableCell>
          <TableCell sx={stylesAdmin.bodyItem}>
            <TableActions handleDelete={handleDelete} department={department} />
          </TableCell>
        </TableRow>
      ))}
    </Table>
  );
};

export default AdminDepartmentsTable;
