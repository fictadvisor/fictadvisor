import React, { FC, useState } from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { Stack } from '@mui/material';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import { TrashBucketButton } from '@/components/common/ui/icon-button-mui/variants';
import DeletePopup from '@/components/pages/admin/admin-teachers/common/components/delete-popup';
import { Teacher } from '@/types/teacher';

import * as styles from './TableActions.styles';

interface TableActionsProps {
  teacher: Teacher;
  deleteTeacher: (id: string) => Promise<void>;
}

const TableActions: FC<TableActionsProps> = ({ teacher, deleteTeacher }) => {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <Stack sx={styles.tableColumn}>
      <Button
        href={`/admin/teachers/edit/${teacher.id}`}
        text="Редагувати"
        variant={ButtonVariant.OUTLINE}
        startIcon={<PencilSquareIcon />}
        size={ButtonSize.SMALL}
        sx={styles.button}
      />
      <TrashBucketButton onClick={() => setPopupOpen(true)} />
      {popupOpen && (
        <DeletePopup
          setPopupOpen={setPopupOpen}
          handleDeleteSubmit={() => deleteTeacher(teacher.id)}
          name={`викладача ${teacher.lastName} ${teacher.firstName[0]}. ${teacher.middleName[0]}.`}
        />
      )}
    </Stack>
  );
};

export default TableActions;
