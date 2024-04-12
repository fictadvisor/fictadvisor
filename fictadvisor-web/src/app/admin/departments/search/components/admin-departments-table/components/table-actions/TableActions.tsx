import React, { FC, useState } from 'react';
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
import { Cathedra } from '@/types/cathedra';

import * as styles from './TableActions.styles';

interface TableActionsProps {
  department: Cathedra;
  handleDelete: (id: string) => Promise<void>;
}

const TableActions: FC<TableActionsProps> = ({ department, handleDelete }) => {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <Box sx={stylesAdmin.actions}>
      <Box sx={stylesAdmin.buttonSection}>
        <Button
          sx={styles.button}
          text="Редагувати"
          size={ButtonSize.SMALL}
          variant={ButtonVariant.OUTLINE}
          startIcon={<PencilSquareIcon />}
          href={`/admin/departments/edit/${department.id}`}
        />
        <TrashBucketButton onClick={() => setPopupOpen(true)} />
      </Box>
      {popupOpen && (
        <DeletePopup
          setPopupOpen={setPopupOpen}
          handleDeleteSubmit={() => handleDelete(department.id)}
          name={`Департамент ${department.name}`}
        />
      )}
    </Box>
  );
};

export default TableActions;
