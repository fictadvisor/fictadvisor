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
import { IconButtonShape } from '@/components/common/ui/icon-button';
import IconButton from '@/components/common/ui/icon-button-mui';
import { IconButtonColor } from '@/components/common/ui/icon-button-mui/types';
import { Cathedra } from '@/lib/api/cathera/types/GetAllResponse';

import * as styles from './TableActions.styles';

interface TableActionsProps {
  department: Cathedra;
  handleDelete: (id: string) => Promise<void>;
}

const TableActions: FC<TableActionsProps> = ({ department, handleDelete }) => {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <Box sx={styles.actions}>
      <Box sx={styles.buttonSection}>
        <Button
          sx={styles.button}
          text="Редагувати"
          size={ButtonSize.SMALL}
          variant={ButtonVariant.OUTLINE}
          startIcon={<PencilSquareIcon />}
          href={`/admin/departments/edit/${department.id}`}
        />

        <IconButton
          icon={<TrashIcon width={24} height={24} />}
          sx={styles.trashIcon}
          color={IconButtonColor.SECONDARY}
          shape={IconButtonShape.CIRCLE}
          onClick={() => setPopupOpen(true)}
        />
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
