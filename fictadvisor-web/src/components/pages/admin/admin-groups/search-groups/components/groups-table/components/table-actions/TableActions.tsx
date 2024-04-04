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
import { Group } from '@/types/group';

interface TableActionsProps {
  group: Group;
  deleteGroup: (id: string) => Promise<void>;
}
import * as stylesAdmin from '@/components/pages/admin/common/styles/AdminPages.styles';

const TableActions: FC<TableActionsProps> = ({ group, deleteGroup }) => {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <Stack sx={stylesAdmin.tableColumn}>
      <Button
        href={`/admin/groups/edit/${group.id}`}
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
          handleDeleteSubmit={() => deleteGroup(group.id)}
          name={`групу ${group.code}`}
        />
      )}
    </Stack>
  );
};

export default TableActions;
