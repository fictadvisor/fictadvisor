import React, { FC } from 'react';
import { QueryObserverBaseResult } from 'react-query';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Box, Table, TableCell, TableHead, TableRow } from '@mui/material';
import { isAxiosError } from 'axios';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import IconButton from '@/components/common/ui/icon-button-mui';
import {
  IconButtonColor,
  IconButtonShape,
} from '@/components/common/ui/icon-button-mui/types';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import SubjectAPI from '@/lib/api/subject/SubjectAPI';
import { Subject } from '@/types/subject';

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
        toast.displayError(e.response?.data.message);
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
              <Box sx={styles.buttonSection}>
                <Button
                  text="Редагувати"
                  sx={styles.editButton}
                  size={ButtonSize.SMALL}
                  variant={ButtonVariant.OUTLINE}
                  startIcon={<PencilSquareIcon />}
                  href={`/admin/subjects/edit/${subject.id}`}
                />
                <IconButton
                  onClick={() => handleDelete(subject.id)}
                  icon={<TrashIcon />}
                  shape={IconButtonShape.CIRCLE}
                  color={IconButtonColor.ERROR}
                />
              </Box>
            </TableCell>
          </TableRow>
        ))}
    </Table>
  );
};

export default AdminSubjectTable;
