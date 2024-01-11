import React, { FC, ReactNode, useRef, useState } from 'react';
import { EllipsisVerticalIcon, TrashIcon } from '@heroicons/react/24/outline';
import { ClickAwayListener, Popper } from '@mui/base';
import { Box } from '@mui/material';
import { Stack } from '@mui/system';

import Button from '@/components/common/ui/button-mui/Button';
import {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import IconButton from '@/components/common/ui/icon-button-mui/IconButton';
import { IconButtonColor } from '@/components/common/ui/icon-button-mui/types';
import roleNamesMapper from '@/components/pages/account-page/components/group-tab/components/table/constants';
import { PERMISSION, PermissionResponse } from '@/lib/services/permisson/types';
import { UserGroupRole } from '@/types/user';

import { StudentsTableItem } from '../../types';

import * as styles from './MobileDropdown.style';

export interface MobileStudentTableButtonsProps {
  setDeletePopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setChangePopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  student: StudentsTableItem;
  permissions: PermissionResponse;
  arrowIcon: ReactNode;
}

const MobileStudentsTableButtons: FC<MobileStudentTableButtonsProps> = ({
  setDeletePopupOpen,
  setChangePopupOpen,
  student,
  permissions,
  arrowIcon,
}) => {
  const [isPopperOpen, setIsPopperOpen] = useState<boolean>(false);
  const EllipsisIconRef = useRef<HTMLButtonElement>(null);
  const buttonName =
    student.role === UserGroupRole.MODERATOR
      ? roleNamesMapper[UserGroupRole.STUDENT]
      : roleNamesMapper[UserGroupRole.MODERATOR];
  const emptyList =
    (!permissions[PERMISSION.GROUPS_$GROUPID_STUDENTS_REMOVE] &&
      !permissions[PERMISSION.GROUPS_$GROUPID_ADMIN_SWITCH]) ||
    (permissions[PERMISSION.GROUPS_$GROUPID_STUDENTS_REMOVE] &&
      !permissions[PERMISSION.GROUPS_$GROUPID_ADMIN_SWITCH] &&
      student.role !== UserGroupRole.STUDENT);
  return (
    <ClickAwayListener onClickAway={() => setIsPopperOpen(false)}>
      <Box>
        <IconButton
          ref={EllipsisIconRef}
          icon={<EllipsisVerticalIcon className={'icon'} />}
          color={IconButtonColor.TRANSPARENT}
          onClick={() => setIsPopperOpen(pr => !pr)}
          disabled={emptyList || student.role === UserGroupRole.CAPTAIN}
        />
        <Popper
          style={{ zIndex: '5' }}
          open={isPopperOpen}
          placement={'bottom-end'}
          anchorEl={EllipsisIconRef.current}
        >
          <Stack sx={styles.dropdown}>
            {permissions[PERMISSION.GROUPS_$GROUPID_ADMIN_SWITCH] &&
              student.role !== UserGroupRole.CAPTAIN && (
                <Button
                  size={ButtonSize.SMALL}
                  text={buttonName}
                  variant={ButtonVariant.TEXT}
                  startIcon={arrowIcon}
                  onClick={() => setChangePopupOpen(true)}
                />
              )}
            {!emptyList && (
              <Button
                size={ButtonSize.SMALL}
                text={'Видалити'}
                variant={ButtonVariant.TEXT}
                startIcon={<TrashIcon />}
                onClick={() => setDeletePopupOpen(true)}
              />
            )}
          </Stack>
        </Popper>
      </Box>
    </ClickAwayListener>
  );
};
export default MobileStudentsTableButtons;
