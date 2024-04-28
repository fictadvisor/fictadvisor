import React, { FC, useState } from 'react';
import { DisciplineAdminResponse } from '@fictadvisor/utils/responses';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { Stack } from '@mui/material';

import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import Button from '@/components/common/ui/button-mui';
import {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import DeletePopup from '@/components/common/ui/delete-popup';
import { TrashBucketButton } from '@/components/common/ui/icon-button-mui/variants';

interface TableActionsProps {
  discipline: DisciplineAdminResponse;
  deleteDiscipline: (id: string) => Promise<void>;
}

const TableActions: FC<TableActionsProps> = ({
  discipline,
  deleteDiscipline,
}) => {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <Stack sx={stylesAdmin.tableColumn} justifyContent="right">
      <Button
        href={`/admin/disciplines/edit/${discipline.id}`}
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
          handleDeleteSubmit={() => deleteDiscipline(discipline.id)}
          name={`дисципліну ${discipline.name}`}
        />
      )}
    </Stack>
  );
};

export default TableActions;
