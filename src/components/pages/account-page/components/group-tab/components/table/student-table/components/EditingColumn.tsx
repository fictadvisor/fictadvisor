import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
} from '@heroicons/react/24/outline';
import Popup from 'src/components/common/ui/pop-ups-mui/Popup';

import { AlertColor } from '@/components/common/ui/alert';
import Button, {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button';
import { TrashBucketButton } from '@/components/common/ui/icon-button/variants';
import {
  StudentRole,
  StudentTableItem,
} from '@/components/pages/account-page/components/group-tab/components/table/student-table/StudentTable';
import dataMapper from '@/components/pages/account-page/components/group-tab/components/table/student-table/utils';
import UseAuthentication from '@/hooks/use-authentication/useAuthentication';
import { GroupAPI } from '@/lib/api/group/GroupAPI';
import { showAlert } from '@/redux/reducers/alert.reducer';

import styles from '../StudentTable.module.scss';

interface EditingColumnProps {
  student: StudentTableItem;
  refetch;
}

const EditingColumn: FC<EditingColumnProps> = ({ student, refetch }) => {
  const { user } = UseAuthentication();
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenChange, setIsOpenChange] = useState(false);

  const dispatch = useDispatch();
  const handleDelete = async () => {
    try {
      setIsOpenDelete(false);
      await GroupAPI.removeStudent(user.group.id, student.id);
      await refetch();
    } catch (e) {
      dispatch(
        showAlert({
          title: 'Щось пішло не так, спробуй пізніше!',
          color: AlertColor.ERROR,
        }),
      );
    }
  };

  const handleChangeStatus = async () => {
    try {
      setIsOpenChange(false);
      await GroupAPI.switchStudentRole(user.group.id, student.id, {
        roleName:
          student.role === StudentRole.MODERATOR ? 'STUDENT' : 'MODERATOR',
      });
      await refetch();
    } catch (e) {
      dispatch(
        showAlert({
          title: 'Щось пішло не так, спробуй пізніше!',
          color: AlertColor.ERROR,
        }),
      );
    }
  };

  const buttonText =
    student.role === StudentRole.MODERATOR
      ? StudentRole.STUDENT
      : StudentRole.MODERATOR;
  const buttonIcon =
    student.role === StudentRole.MODERATOR ? (
      <ArrowDownCircleIcon className="icon" />
    ) : (
      <ArrowUpCircleIcon className="icon" />
    );

  if (
    dataMapper[user.group.role] === StudentRole.CAPTAIN &&
    student.role !== StudentRole.CAPTAIN
  ) {
    return (
      <div className={styles['side-buttons']}>
        <Popup
          open={isOpenChange}
          title={
            student.role === StudentRole.MODERATOR
              ? 'Зробити студентом'
              : 'Зробити зам старостою'
          }
          text={`Ви дійсно бажаєте зробити користувача ${student.fullName} ${
            student.role === StudentRole.MODERATOR
              ? 'студентом'
              : 'зам старостою'
          }?`}
          onClose={() => setIsOpenChange(false)}
          firstButton={
            <Button
              size={ButtonSize.SMALL}
              text="Скасувати"
              color={ButtonColor.PRIMARY}
              variant={ButtonVariant.OUTLINE}
              onClick={() => setIsOpenChange(false)}
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
          open={isOpenDelete}
          title="Видалити користувача"
          text={`Чи дійсно ви бажаєте видалити користувача ${student.fullName}? Якщо ви випадково видалите користувача, йому треба буд відправити повторний запит до групи.`}
          onClose={() => setIsOpenDelete(false)}
          firstButton={
            <Button
              size={ButtonSize.SMALL}
              text="Скасувати"
              color={ButtonColor.PRIMARY}
              variant={ButtonVariant.OUTLINE}
              onClick={() => setIsOpenDelete(false)}
            />
          }
          secondButton={
            <Button
              size={ButtonSize.SMALL}
              text="Так"
              color={ButtonColor.PRIMARY}
              variant={ButtonVariant.FILLED}
              onClick={handleDelete}
            />
          }
        />
        <div>
          <Button
            text={buttonText}
            size={ButtonSize.SMALL}
            variant={ButtonVariant.OUTLINE}
            startIcon={buttonIcon}
            className={styles['role-modifier']}
            onClick={() => setIsOpenChange(true)}
          />
        </div>
        <div>
          <TrashBucketButton onClick={() => setIsOpenDelete(true)} />
        </div>
      </div>
    );
  }

  if (dataMapper[user.group.role] === StudentRole.MODERATOR && !student.role) {
    return (
      <>
        <Popup
          open={isOpenDelete}
          title="Видалити користувача"
          text={`Чи дійсно ви бажаєте видалити користувача ${student.fullName}? Якщо ви випадково видалите користувача, йому треба буд відправити повторний запит до групи.`}
          onClose={() => setIsOpenDelete(false)}
          firstButton={
            <Button
              size={ButtonSize.SMALL}
              text="Скасувати"
              color={ButtonColor.PRIMARY}
              variant={ButtonVariant.OUTLINE}
              onClick={() => setIsOpenDelete(false)}
            />
          }
          secondButton={
            <Button
              size={ButtonSize.SMALL}
              text="Так"
              color={ButtonColor.PRIMARY}
              variant={ButtonVariant.FILLED}
              onClick={handleDelete}
            />
          }
        />
        <TrashBucketButton
          onClick={() => {
            setIsOpenDelete(true);
          }}
        />
      </>
    );
  }
};

export default EditingColumn;
