import React, { FC, useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { Box, Link } from '@mui/material';
import NextLink from 'next/link';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import DeletePopup from '@/components/common/ui/delete-popup';
import { IconButtonShape } from '@/components/common/ui/icon-button';
import IconButton from '@/components/common/ui/icon-button-mui';
import { IconButtonColor } from '@/components/common/ui/icon-button-mui/types';
import { GroupStudent } from '@/types/student';

import * as styles from './TableActions.styles';
interface TableActionsProps {
  student: GroupStudent;
  handleDelete: (id: string) => Promise<void>;
}

const TableActions: FC<TableActionsProps> = ({ student, handleDelete }) => {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <Box sx={styles.actions}>
      <Link
        href={`/admin/students/edit/${student.id}`}
        component={NextLink}
        underline="none"
        color="inherit"
      >
        <Button
          size={ButtonSize.SMALL}
          startIcon={<PencilSquareIcon width={24} height={24} />}
          variant={ButtonVariant.OUTLINE}
          text="Редагувати"
        />
      </Link>
      <IconButton
        icon={<TrashIcon width={24} height={24} />}
        sx={styles.trashIcon}
        color={IconButtonColor.SECONDARY}
        shape={IconButtonShape.CIRCLE}
        onClick={() => setPopupOpen(true)}
      />
      {popupOpen && (
        <DeletePopup
          setPopupOpen={setPopupOpen}
          handleDeleteSubmit={() => handleDelete(student.id)}
          name={`студента ${student?.lastName} ${student?.firstName} ${student?.middleName}`}
        />
      )}
    </Box>
  );
};

export default TableActions;
