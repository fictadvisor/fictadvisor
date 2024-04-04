import React, { FC, useState } from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { Box, Link } from '@mui/material';
import NextLink from 'next/link';

import Button from '@/components/common/ui/button';
import {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import DeletePopup from '@/components/common/ui/delete-popup';
import { TrashBucketButton } from '@/components/common/ui/icon-button-mui/variants';
import * as stylesAdmin from '@/components/pages/admin/common/styles/AdminPages.styles';
import { Role } from '@/types/role';

interface TableActionsProps {
  role: Role;
  handleDelete: (id: string) => Promise<void>;
}

const TableActions: FC<TableActionsProps> = ({ role, handleDelete }) => {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <Box sx={stylesAdmin.actions}>
      <Link
        href={`/admin/roles/${role.id}/grants`}
        component={NextLink}
        underline="none"
        color="inherit"
      >
        <Button
          size={ButtonSize.SMALL}
          variant={ButtonVariant.FILLED}
          text="Права"
        />
      </Link>
      <Link
        href={`/admin/roles/edit/${role.id}`}
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
      <TrashBucketButton onClick={() => setPopupOpen(true)} />
      {popupOpen && (
        <DeletePopup
          setPopupOpen={setPopupOpen}
          handleDeleteSubmit={() => handleDelete(role.id)}
          name={`роль ${role.displayName}`}
        />
      )}
    </Box>
  );
};

export default TableActions;
