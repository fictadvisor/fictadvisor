import React, { FC } from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
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

import Button from '@/components/common/ui/button-mui';
import {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import { TrashBucketButton } from '@/components/common/ui/icon-button-mui/variants';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import DisciplineAPI from '@/lib/api/discipline/DisciplineAPI';
import mergeSx from '@/lib/utils/MergeSxStylesUtil';
import { AdminDiscipline } from '@/types/discipline';

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
        toast.displayError(e.response?.data.message);
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
                <Stack sx={styles.tableColumn} justifyContent="right">
                  <Button
                    href={`/admin/disciplines/edit/${discipline.id}`}
                    text="Редагувати"
                    variant={ButtonVariant.OUTLINE}
                    startIcon={<PencilSquareIcon />}
                    size={ButtonSize.SMALL}
                    sx={styles.button}
                  />
                  <TrashBucketButton
                    onClick={() => deleteDiscipline(discipline.id)}
                  />
                </Stack>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default DisciplinesTable;
