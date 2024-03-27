import React, { FC, Fragment, useState } from 'react';
import { QueryObserverBaseResult } from 'react-query';
import { PERMISSION } from '@fictadvisor/utils/security';
import {
  ArrowDownCircleIcon,
  ArrowsUpDownIcon,
  ArrowUpCircleIcon,
  CheckCircleIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { Avatar, Box, Grid, Typography, useMediaQuery } from '@mui/material';

import { Captain } from '@/components/common/icons/Captain';
import { Moderator } from '@/components/common/icons/Moderator';
import AlertButton from '@/components/common/ui/alert-button';
import { AlertButtonVariant } from '@/components/common/ui/alert-button/types';
import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import IconButton from '@/components/common/ui/icon-button-mui';
import {
  IconButtonColor,
  IconButtonShape,
} from '@/components/common/ui/icon-button-mui/types';
import Popup from '@/components/common/ui/pop-ups/Popup';
import Tag from '@/components/common/ui/tag';
import { TagSize, TagVariant } from '@/components/common/ui/tag/types';
import roleNamesMapper from '@/components/pages/account-page/components/group-tab/components/table/constants';
import * as gridStyles from '@/components/pages/account-page/components/group-tab/components/table/grid.styles';
import TransferCaptainPopup from '@/components/pages/account-page/components/group-tab/components/table/student-table/components/editing-column/TransferCaptainPopup';
import MobileDropdown from '@/components/pages/account-page/components/group-tab/components/table/student-table/components/mobile-dropdown/MobileDropdown';
import UseAuthentication from '@/hooks/use-authentication/useAuthentication';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import GroupAPI from '@/lib/api/group/GroupAPI';
import { PermissionResponse } from '@/lib/services/permisson/types';
import mergeSx from '@/lib/utils/MergeSxStylesUtil';
import theme from '@/styles/theme';
import { UserGroupRole } from '@/types/user';

import { StudentsTableItem } from '../../../types';

import * as styles from './EditingColumn.styles';

interface EditingColumnProps {
  student: StudentsTableItem;
  permissions: PermissionResponse;
  refetch: QueryObserverBaseResult['refetch'];
  rows: StudentsTableItem[];
}

const EditingColumn: FC<EditingColumnProps> = ({
  student,
  permissions,
  refetch,
  rows,
}) => {
  const { user } = UseAuthentication();
  const { displayError } = useToastError();
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const [transferCaptainPopupOpen, setTransferCaptainPopupOpen] =
    useState(false);
  const [newCaptain, setNewCaptain] = useState('');
  const [changePopupOpen, setChangePopupOpen] = useState(false);

  const isMobile = useMediaQuery(theme.breakpoints.down('desktop'));
  const handleDelete = async () => {
    try {
      setDeletePopupOpen(false);

      if (user.group) await GroupAPI.removeStudent(user.group.id, student.id);

      await refetch();
    } catch (error) {
      displayError(error);
    }
  };
  const handleChangeStatus = async () => {
    try {
      setChangePopupOpen(false);
      if (user.group)
        await GroupAPI.updateStudentRole(user?.group?.id, student.id, {
          roleName:
            student.role === UserGroupRole.MODERATOR
              ? UserGroupRole.STUDENT
              : UserGroupRole.MODERATOR,
        });
      await refetch();
    } catch (error) {
      displayError(error);
    }
  };

  const handleChangeCaptain = async () => {
    try {
      setTransferCaptainPopupOpen(false);
      if (user.group)
        await GroupAPI.updateCaptain(user?.group?.id, {
          studentId: newCaptain,
        });
      setNewCaptain('');
      await refetch();
    } catch (error) {
      displayError(error);
    }
  };

  const deletePrivilege =
    (permissions[PERMISSION.GROUPS_$GROUPID_STUDENTS_REMOVE] &&
      !permissions[PERMISSION.GROUPS_$GROUPID_ADMIN_SWITCH] &&
      student.role === UserGroupRole.STUDENT) ||
    (permissions[PERMISSION.GROUPS_$GROUPID_STUDENTS_REMOVE] &&
      permissions[PERMISSION.GROUPS_$GROUPID_ADMIN_SWITCH] &&
      student.role !== UserGroupRole.CAPTAIN);

  let buttonText = roleNamesMapper[UserGroupRole.MODERATOR];

  if (student.role === UserGroupRole.MODERATOR) {
    buttonText = roleNamesMapper[UserGroupRole.STUDENT];
  } else if (student.role === UserGroupRole.CAPTAIN) {
    buttonText = 'Передати старосту';
  }

  let buttonIcon = <ArrowUpCircleIcon />;

  if (student.role === UserGroupRole.MODERATOR) {
    buttonIcon = <ArrowDownCircleIcon />;
  } else if (student.role === UserGroupRole.CAPTAIN) {
    buttonIcon = <ArrowsUpDownIcon />;
  }

  return (
    <>
      <Popup
        icon={<CheckCircleIcon />}
        open={changePopupOpen}
        title={
          student.role === UserGroupRole.MODERATOR
            ? 'Зробити студентом'
            : 'Зробити заст. старости'
        }
        content={`Ти дійсно бажаєш зробити ${student.fullName} ${
          student.role === UserGroupRole.MODERATOR
            ? 'студентом'
            : 'заст. старости'
        }?`}
        onClose={() => setChangePopupOpen(false)}
        firstButton={
          <Button
            size={ButtonSize.SMALL}
            text="Скасувати"
            color={ButtonColor.PRIMARY}
            variant={ButtonVariant.OUTLINE}
            onClick={() => setChangePopupOpen(false)}
          />
        }
        secondButton={
          <Button
            size={ButtonSize.SMALL}
            text="Так"
            color={ButtonColor.PRIMARY}
            variant={ButtonVariant.FILLED}
            onClick={handleChangeStatus}
          />
        }
      />
      <Popup
        hasCross={true}
        open={transferCaptainPopupOpen}
        title="Передати права старости"
        content={
          <TransferCaptainPopup
            rows={rows}
            newCaptain={newCaptain}
            setNewCaptain={setNewCaptain}
          />
        }
        onClose={() => {
          setTransferCaptainPopupOpen(false);
          setNewCaptain('');
        }}
        firstButton={
          <Button
            size={ButtonSize.SMALL}
            text="Скасувати"
            color={ButtonColor.SECONDARY}
            variant={ButtonVariant.OUTLINE}
            onClick={() => {
              setTransferCaptainPopupOpen(false);
              setNewCaptain('');
            }}
            sx={styles.canselButton}
          />
        }
        secondButton={
          <Button
            size={ButtonSize.SMALL}
            startIcon={<ArrowsUpDownIcon />}
            text="Змінити"
            color={ButtonColor.PRIMARY}
            variant={ButtonVariant.FILLED}
            onClick={handleChangeCaptain}
            sx={styles.transferButton}
          />
        }
        sx={styles.transferCaptainPopup}
      />
      <Popup
        icon={<TrashIcon />}
        open={deletePopupOpen}
        title="Видалити користувача"
        content={`Чи дійсно ти бажаєш видалити користувача ${student.fullName}? Якщо ти випадково видалиш користувача, йому треба буде відправити повторний запит до групи.`}
        onClose={() => setDeletePopupOpen(false)}
        firstButton={
          <Button
            size={ButtonSize.SMALL}
            text="Скасувати"
            color={ButtonColor.PRIMARY}
            variant={ButtonVariant.TEXT}
            onClick={() => setDeletePopupOpen(false)}
          />
        }
        secondButton={
          <AlertButton
            text="Видалити"
            variant={AlertButtonVariant.ERROR_OUTLINE}
            onClick={handleDelete}
          />
        }
      />
      {!isMobile && permissions[PERMISSION.GROUPS_$GROUPID_ADMIN_SWITCH] && (
        <Button
          text={buttonText}
          sx={{ width: 'fit-content', whiteSpace: 'nowrap' }}
          size={ButtonSize.SMALL}
          variant={ButtonVariant.OUTLINE}
          startIcon={buttonIcon}
          onClick={() =>
            student.role === UserGroupRole.CAPTAIN
              ? setTransferCaptainPopupOpen(true)
              : setChangePopupOpen(true)
          }
        />
      )}
      {isMobile ? (
        <MobileDropdown
          arrowIcon={buttonIcon}
          setDeletePopupOpen={setDeletePopupOpen}
          setChangePopupOpen={setChangePopupOpen}
          setTransferCaptainPopupOpen={setTransferCaptainPopupOpen}
          permissions={permissions}
          student={student}
        />
      ) : (
        deletePrivilege && (
          <IconButton
            onClick={() => setDeletePopupOpen(true)}
            icon={<TrashIcon />}
            shape={IconButtonShape.CIRCLE}
            color={IconButtonColor.ERROR}
          />
        )
      )}
    </>
  );
};

export default EditingColumn;
