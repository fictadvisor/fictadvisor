import React, { FC } from 'react';
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { isAxiosError } from 'axios';

import { useToastError } from '@/hooks/use-toast-error/useToastError';
import DisciplineAPI from '@/lib/api/discipline/DisciplineAPI';
import mergeSx from '@/lib/utils/MergeSxStylesUtil';
import { AdminDiscipline } from '@/types/discipline';

import TableActions from './components/table-actions';
import * as styles from './DisciplinesTable.styles';

interface DisciplinesAdminSearchProps {
  disciplines?: AdminDiscipline[];
}

const DisciplinesTable: FC<DisciplinesAdminSearchProps> = ({ disciplines }) => {
  const toast = useToastError();

  const deleteDiscipline = async (id: string) => {
    try {
      await DisciplineAPI.deleteDiscipline(id);
    } catch (e) {
      if (isAxiosError(e)) {
        toast.displayError(e);
      }
    }
  };

  return (
    <Table>
      <TableHead>
        <TableCell sx={mergeSx(styles.headItem)}>Назва</TableCell>
        <TableCell sx={styles.headItem}>Група</TableCell>
        <TableCell sx={styles.headItem}>Викладачі</TableCell>
        <TableCell sx={styles.headItem}>Рік і семестр</TableCell>
        <TableCell sx={styles.headItem} />
      </TableHead>
      <TableBody>
        {disciplines &&
          disciplines.map((discipline, index) => (
            <TableRow key={index}>
              <TableCell sx={styles.nameBodyItem}>
                <Stack sx={styles.tableColumn}>
                  <Typography>{discipline.name}</Typography>
                </Stack>
              </TableCell>
              <TableCell sx={styles.bodyItem}>
                <Stack sx={styles.tableColumn}>
                  <Typography>{discipline.group.code}</Typography>
                </Stack>
              </TableCell>
              <TableCell sx={styles.bodyItem}>
                <Stack sx={styles.tableColumn}>
                  <Typography>
                    {discipline.teachers.map(
                      teacher =>
                        teacher.lastName &&
                        `${teacher.lastName} ${teacher.firstName[0]}. ${teacher.middleName[0]}., `,
                    )}
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell sx={styles.bodyItem}>
                <Stack sx={styles.tableColumn}>
                  <Typography>
                    {discipline.semester} семестр {discipline.year} -{' '}
                    {discipline.year + 1}
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell sx={styles.bodyItem}>
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
