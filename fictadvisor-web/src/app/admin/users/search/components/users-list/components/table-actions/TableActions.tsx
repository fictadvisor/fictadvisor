import React, { FC, useState } from 'react';
import { UserForGetAllResponse } from '@fictadvisor/utils/responses';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { Box, Link } from '@mui/material';
import NextLink from 'next/link';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import DeletePopup from '@/components/common/ui/delete-popup';
import { TrashBucketButton } from '@/components/common/ui/icon-button-mui/variants';

interface TableActionsProps {
  user: UserForGetAllResponse;
  handleDelete: (id: string) => Promise<void>;
}
import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';

const TableActions: FC<TableActionsProps> = ({ user, handleDelete }) => {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <Box sx={stylesAdmin.actions}>
      <Link
        href={`/admin/users/edit/${user.id}`}
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
          handleDeleteSubmit={() => handleDelete(user.id)}
          name={`користувача ${user.username}`}
        />
      )}
    </Box>
  );
};

export default TableActions;
