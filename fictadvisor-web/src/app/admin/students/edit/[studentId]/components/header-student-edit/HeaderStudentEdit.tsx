import React, { FC, useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Box, CardHeader, Stack } from '@mui/material';

import * as stylesAdmin from '@/app/admin/common/styles/AdminPages.styles';
import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import DeletePopup from '@/components/common/ui/delete-popup';
import { GroupStudent } from '@/types/student';

interface HeaderStudentEditProps {
  student: GroupStudent;
  handleDelete: (userId: string) => Promise<void>;
}

const HeaderStudentEdit: FC<HeaderStudentEditProps> = ({
  student,
  handleDelete,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box sx={stylesAdmin.header}>
      <CardHeader
        title="Редагування"
        subheader={`${student.firstName} ${student.middleName} ${student.lastName}`}
        sx={stylesAdmin.title}
      />
      <Stack flexDirection="row" gap="8px">
        <Button
          size={ButtonSize.MEDIUM}
          color={ButtonColor.SECONDARY}
          text="Скасувати"
          href="/admin/students"
          sx={stylesAdmin.button}
        />
        <Button
          size={ButtonSize.MEDIUM}
          variant={ButtonVariant.OUTLINE}
          color={ButtonColor.SECONDARY}
          startIcon={<TrashIcon />}
          text="Видалити"
          onClick={() => setIsOpen(true)}
          sx={stylesAdmin.button}
        />
        {isOpen && (
          <DeletePopup
            setPopupOpen={setIsOpen}
            handleDeleteSubmit={() => handleDelete(student.id)}
            name={`студента ${student.lastName} ${student.firstName} ${student.middleName}`}
          />
        )}
        <Button
          size={ButtonSize.MEDIUM}
          text="Зберегти"
          type="submit"
          sx={stylesAdmin.button}
        />
      </Stack>
    </Box>
  );
};
export default HeaderStudentEdit;
