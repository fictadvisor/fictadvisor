import React, { FC, useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { Box } from '@mui/material';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import DeletePopup from '@/components/common/ui/delete-popup';
import IconButton from '@/components/common/ui/icon-button-mui';
import {
  IconButtonColor,
  IconButtonShape,
} from '@/components/common/ui/icon-button-mui/types';
import { Subject } from '@/types/subject';

import * as styles from './TableActions.styles';

interface TableActionsProps {
  subject: Subject;
  handleDelete: (id: string) => Promise<void>;
}

const TableActions: FC<TableActionsProps> = ({ subject, handleDelete }) => {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
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
        onClick={() => setPopupOpen(true)}
        icon={<TrashIcon />}
        shape={IconButtonShape.CIRCLE}
        color={IconButtonColor.ERROR}
      />
      {popupOpen && (
        <DeletePopup
          setPopupOpen={setPopupOpen}
          handleDeleteSubmit={() => handleDelete(subject.id)}
          name={`предмет ${subject.name}`}
        />
      )}
    </Box>
  );
};

export default TableActions;
