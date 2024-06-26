import React, { FC, useState } from 'react';
import { DeleteCommentDTO } from '@fictadvisor/utils/requests';
import { CommentResponse } from '@fictadvisor/utils/responses';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { Stack } from '@mui/material';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import DeletePopup from '@/components/common/ui/delete-popup';
import { TrashBucketButton } from '@/components/common/ui/icon-button-mui/variants';

import * as styles from './TableActions.styles';

interface TableActionsProps {
  comment: CommentResponse;
  handleDelete: (
    data: DeleteCommentDTO,
    disciplineTeacherId: string,
  ) => Promise<void>;
}

const TableActions: FC<TableActionsProps> = ({ comment, handleDelete }) => {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <Stack sx={styles.buttonsColumn}>
      <Button
        href={`/admin/comments/edit/${encodeURIComponent(
          JSON.stringify(comment),
        )}`}
        text="Редагувати"
        variant={ButtonVariant.OUTLINE}
        startIcon={<PencilSquareIcon />}
        size={ButtonSize.SMALL}
      />
      <TrashBucketButton onClick={() => setPopupOpen(true)} />
      {popupOpen && (
        <DeletePopup
          setPopupOpen={setPopupOpen}
          handleDeleteSubmit={() =>
            handleDelete(comment, comment.disciplineTeacherId)
          }
          name="цей комментар"
        />
      )}
    </Stack>
  );
};

export default TableActions;
