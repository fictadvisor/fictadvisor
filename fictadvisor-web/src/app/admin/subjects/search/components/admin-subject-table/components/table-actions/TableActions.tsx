import React, { FC, useState } from 'react';
import { SubjectCountResponse } from '@fictadvisor/utils/responses';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { Box } from '@mui/material';

import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import Button from '@/components/common/ui/button-mui';
import {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import DeletePopup from '@/components/common/ui/delete-popup';
import { TrashBucketButton } from '@/components/common/ui/icon-button-mui/variants';

interface TableActionsProps {
  subject: SubjectCountResponse;
  handleDelete: (id: string) => Promise<void>;
}

const TableActions: FC<TableActionsProps> = ({ subject, handleDelete }) => {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <Box sx={stylesAdmin.buttonSection}>
      <Button
        text="Редагувати"
        sx={stylesAdmin.button}
        size={ButtonSize.SMALL}
        variant={ButtonVariant.OUTLINE}
        startIcon={<PencilSquareIcon />}
        href={`/admin/subjects/edit/${subject.id}`}
      />
      <TrashBucketButton onClick={() => setPopupOpen(true)} />
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
