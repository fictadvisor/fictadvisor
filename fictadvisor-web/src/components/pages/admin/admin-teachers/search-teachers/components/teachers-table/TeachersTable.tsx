import React, { FC } from 'react';
import {
  Avatar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import {
  CathedraColors,
  RoleColors,
  TagText,
} from '@/components/common/ui/cards/card-roles/CardRoles';
import Tag from '@/components/common/ui/tag';
import { TagSize, TagVariant } from '@/components/common/ui/tag/types';
import * as stylesAdmin from '@/components/pages/admin/common/styles/AdminPages.styles';
import mergeSx from '@/lib/utils/MergeSxStylesUtil';
import { Teacher } from '@/types/teacher';

import TableActions from './components/table-actions';

interface TeachersAdminSearchProps {
  teachers: Teacher[];
  deleteTeacher: (id: string) => Promise<void>;
}

const TeachersTable: FC<TeachersAdminSearchProps> = ({
  teachers,
  deleteTeacher,
}) => {
  return (
    <Table>
      <TableHead>
        <TableCell sx={mergeSx(stylesAdmin.headItem, { minWidth: '525px' })}>
          Викладач
        </TableCell>
        <TableCell sx={stylesAdmin.headItem}>Кафедри</TableCell>
        <TableCell sx={stylesAdmin.headItem}>Теги</TableCell>
        <TableCell sx={stylesAdmin.headItem} />
      </TableHead>
      <TableBody>
        {teachers.map(teacher => (
          <TableRow key={teacher.id}>
            <TableCell sx={stylesAdmin.bodyItem}>
              <Stack sx={stylesAdmin.tableColumn}>
                <Avatar src={teacher.avatar} sx={{ width: 36, height: 36 }} />
                <Typography sx={{ ml: '16px' }}>
                  {teacher.lastName} {teacher.firstName[0]}.{' '}
                  {teacher.middleName[0]}.
                </Typography>
              </Stack>
            </TableCell>
            <TableCell sx={stylesAdmin.bodyItem}>
              <Stack sx={stylesAdmin.tableColumn}>
                {teacher.cathedras.map(cathedra => (
                  <Tag
                    key={cathedra.id}
                    text={cathedra.abbreviation}
                    variant={TagVariant.OUTLINE}
                    color={CathedraColors[cathedra.abbreviation]}
                    size={TagSize.SMALL}
                    sx={stylesAdmin.tag}
                  />
                ))}
              </Stack>
            </TableCell>
            <TableCell sx={stylesAdmin.bodyItem}>
              <Stack sx={stylesAdmin.tableColumn}>
                {teacher.roles.map(role => (
                  <Tag
                    key={role}
                    text={TagText[role]}
                    variant={TagVariant.FILL}
                    color={RoleColors[role]}
                    size={TagSize.SMALL}
                    sx={stylesAdmin.tag}
                  />
                ))}
              </Stack>
            </TableCell>
            <TableCell sx={stylesAdmin.bodyItem}>
              <TableActions teacher={teacher} deleteTeacher={deleteTeacher} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TeachersTable;
