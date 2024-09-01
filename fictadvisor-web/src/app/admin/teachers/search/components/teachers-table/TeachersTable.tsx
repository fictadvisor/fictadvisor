import React, { FC } from 'react';
import { TeacherWithRolesAndCathedrasResponse } from '@fictadvisor/utils/responses';
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

import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import {
  CathedraColors,
  RoleColors,
  TagText,
} from '@/components/common/ui/cards/card-discipline-types/CardDisciplineTypes';
import Tag from '@/components/common/ui/tag';
import { TagSize, TagVariant } from '@/components/common/ui/tag/types';
import mergeSx from '@/lib/utils/MergeSxStylesUtil';

import TableActions from './components/table-actions';

interface TeachersAdminSearchProps {
  teachers: TeacherWithRolesAndCathedrasResponse[];
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
                {teacher.disciplineTypes.map(discipline => (
                  <Tag
                    key={discipline}
                    text={TagText[discipline]}
                    variant={TagVariant.FILL}
                    color={RoleColors[discipline]}
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
