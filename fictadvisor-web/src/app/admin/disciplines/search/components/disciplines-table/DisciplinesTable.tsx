import React, { FC } from 'react';
import { DisciplineAdminResponse } from '@fictadvisor/utils/responses';
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import mergeSx from '@/lib/utils/MergeSxStylesUtil';

import TableActions from './components/table-actions';

interface DisciplinesAdminSearchProps {
  disciplines: DisciplineAdminResponse[];
  deleteDiscipline: (id: string) => Promise<void>;
}

const DisciplinesTable: FC<DisciplinesAdminSearchProps> = ({
  disciplines,
  deleteDiscipline,
}) => {
  return (
    <Table>
      <TableHead>
        <TableCell sx={mergeSx(stylesAdmin.headItem)}>Назва</TableCell>
        <TableCell sx={stylesAdmin.headItem}>Група</TableCell>
        <TableCell sx={stylesAdmin.headItem}>Викладачі</TableCell>
        <TableCell sx={stylesAdmin.headItem}>Рік і семестр</TableCell>
        <TableCell sx={stylesAdmin.headItem} />
      </TableHead>
      <TableBody>
        {disciplines.map(discipline => (
          <TableRow key={discipline.id}>
            <TableCell sx={mergeSx(stylesAdmin.bodyItem, { width: '45%' })}>
              <Stack sx={stylesAdmin.tableColumn}>
                <Typography>{discipline.name}</Typography>
              </Stack>
            </TableCell>
            <TableCell sx={stylesAdmin.bodyItem}>
              <Stack sx={stylesAdmin.tableColumn}>
                <Typography>{discipline.group.code}</Typography>
              </Stack>
            </TableCell>
            <TableCell sx={stylesAdmin.bodyItem}>
              <Stack sx={stylesAdmin.tableColumn}>
                <Typography>
                  {discipline.teachers.map(
                    teacher =>
                      teacher.lastName &&
                      `${teacher.lastName} ${teacher.firstName[0]}. ${teacher.middleName[0]}., `,
                  )}
                </Typography>
              </Stack>
            </TableCell>
            <TableCell sx={stylesAdmin.bodyItem}>
              <Stack sx={stylesAdmin.tableColumn}>
                <Typography>
                  {discipline.semester} семестр {discipline.year} -{' '}
                  {discipline.year + 1}
                </Typography>
              </Stack>
            </TableCell>
            <TableCell sx={stylesAdmin.bodyItem}>
              <TableActions
                discipline={discipline}
                deleteDiscipline={deleteDiscipline}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DisciplinesTable;
