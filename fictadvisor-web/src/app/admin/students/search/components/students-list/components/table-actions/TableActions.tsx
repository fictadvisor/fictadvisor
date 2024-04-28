import React, { FC, useState } from 'react';
import { SimpleStudentResponse } from '@fictadvisor/utils/responses';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { Box, Link } from '@mui/material';
import NextLink from 'next/link';

import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import Button from '@/components/common/ui/button-mui';
import {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import DeletePopup from '@/components/common/ui/delete-popup';
import { TrashBucketButton } from '@/components/common/ui/icon-button-mui/variants';

interface TableActionsProps {
  student: SimpleStudentResponse;
  handleDelete: (id: string) => Promise<void>;
}

const TableActions: FC<TableActionsProps> = ({ student, handleDelete }) => {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <Box sx={stylesAdmin.actions}>
      <Link
        href={`/admin/students/edit/${student.id}`}
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
          handleDeleteSubmit={() => handleDelete(student.id)}
          name={`студента ${student.lastName} ${student.firstName} ${student.middleName}`}
        />
      )}
    </Box>
  );
};

export default TableActions;
