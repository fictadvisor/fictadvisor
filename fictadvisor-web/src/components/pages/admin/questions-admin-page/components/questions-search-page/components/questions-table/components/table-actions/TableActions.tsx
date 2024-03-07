import React, { FC, useState } from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { Stack } from '@mui/material';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import DeletePopup from '@/components/common/ui/delete-popup';
import { TrashBucketButton } from '@/components/common/ui/icon-button-mui/variants';
import { AdminQuestion } from '@/components/pages/admin/questions-admin-page/types';

import * as styles from './TableActions.styles';

interface TableActionsProps {
  question: AdminQuestion;
  deleteQuestion: (id: string) => Promise<void>;
}

const TableActions: FC<TableActionsProps> = ({ question, deleteQuestion }) => {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <Stack sx={styles.tableColumn}>
      <Button
        href={`/admin/questions/edit/${question.id}`}
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
          handleDeleteSubmit={() => deleteQuestion(question.id as string)}
          name={`питання ${question.name}`}
        />
      )}
    </Stack>
  );
};

export default TableActions;
