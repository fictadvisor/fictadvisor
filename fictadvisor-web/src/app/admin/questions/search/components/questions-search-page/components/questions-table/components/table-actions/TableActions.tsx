import React, { FC, useState } from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { Stack } from '@mui/material';

import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import { AdminQuestion } from '@/app/admin/questions/common/types';
import Button from '@/components/common/ui/button-mui';
import {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import DeletePopup from '@/components/common/ui/delete-popup';
import { TrashBucketButton } from '@/components/common/ui/icon-button-mui/variants';

interface TableActionsProps {
  question: AdminQuestion;
  deleteQuestion: (id: string) => Promise<void>;
}

const TableActions: FC<TableActionsProps> = ({ question, deleteQuestion }) => {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <Stack sx={stylesAdmin.tableColumn}>
      <Button
        href={`/admin/questions/edit/${question.id}`}
        text="Редагувати"
        variant={ButtonVariant.OUTLINE}
        startIcon={<PencilSquareIcon />}
        size={ButtonSize.SMALL}
        sx={stylesAdmin.button}
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
