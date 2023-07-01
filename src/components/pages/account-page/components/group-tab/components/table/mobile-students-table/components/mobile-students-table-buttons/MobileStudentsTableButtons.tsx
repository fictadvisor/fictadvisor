import React, { FC, useRef, useState } from 'react';
import { QueryObserverBaseResult } from 'react-query';
import { useDispatch } from 'react-redux';
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  EllipsisVerticalIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import Popup from 'src/components/common/ui/pop-ups-mui/Popup';

import { AlertColor } from '@/components/common/ui/alert';
import Button, {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button';
import {
  IconButton,
  IconButtonColor,
} from '@/components/common/ui/icon-button/IconButton';
import roleNamesMapper from '@/components/pages/account-page/components/group-tab/components/table/constants';
import useAuthentication from '@/hooks/use-authentication';
import useOutsideClick from '@/hooks/use-outside-click';
import GroupAPI from '@/lib/api/group/GroupAPI';
import { showAlert } from '@/redux/reducers/alert.reducer';
import { UserGroupRole } from '@/types/user';

import { StudentsTableItem } from '../../../types';

import styles from './MobileStudentsTableButtons.module.scss';

export interface MobileStudentTableButtonsProps {
  value: number;
  currentValue: number;
  onChange: (value: number) => void;
  student: StudentsTableItem;
  variant?: string;
  refetch: QueryObserverBaseResult['refetch'];
}

const MobileStudentsTableButtons: FC<MobileStudentTableButtonsProps> = ({
  value,
  currentValue,
  onChange,
  student,
  refetch,
}) => {
  const { user } = useAuthentication();
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenChange, setIsOpenChange] = useState(false);
  const dispatch = useDispatch();
  const handleDelete = async () => {
    try {
      setIsOpenDelete(false);
      // TODO: remove as and refactor props
      await GroupAPI.removeStudent(user.group?.id as string, student.id);
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
      // TODO: remove as and refactor props
      await GroupAPI.updateStudentRole(user.group?.id as string, student.id, {
        roleName:
          student.role === UserGroupRole.MODERATOR
            ? UserGroupRole.STUDENT
            : UserGroupRole.MODERATOR,
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

  const buttonIcon =
    student.role === UserGroupRole.MODERATOR ? (
      <ArrowDownCircleIcon className="icon" />
    ) : (
      <ArrowUpCircleIcon className="icon" />
    );

  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, () => onChange(-1));

  const buttonName =
    student.role === UserGroupRole.MODERATOR
      ? roleNamesMapper[UserGroupRole.STUDENT]
      : roleNamesMapper[UserGroupRole.MODERATOR];
  return (
    <>
      <Popup
        open={isOpenChange}
        title={
          student.role === UserGroupRole.MODERATOR
            ? 'Зробити студентом'
            : 'Зробити зам старостою'
        }
        text={`Ви дійсно бажаєте зробити користувача ${student.fullName} ${
          student.role === UserGroupRole.MODERATOR
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
      {user.group?.role === UserGroupRole.CAPTAIN ? (
        <>
          {student.role !== UserGroupRole.CAPTAIN ? (
            <div className={styles['button']}>
              <IconButton
                icon={<EllipsisVerticalIcon className={'icon'} />}
                color={IconButtonColor.TRANSPARENT}
                onClick={() => onChange(value)}
              />
              {currentValue === value && (
                <div className={styles['dropdown-content']} ref={wrapperRef}>
                  <Button
                    className={styles['dropdown-button']}
                    text={buttonName}
                    variant={ButtonVariant.TEXT}
                    startIcon={buttonIcon}
                    onClick={() => setIsOpenChange(true)}
                  />
                  <Button
                    className={styles['dropdown-button']}
                    text={'Видалити'}
                    variant={ButtonVariant.TEXT}
                    startIcon={<TrashIcon className={'icon'} />}
                    onClick={() => setIsOpenDelete(true)}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className={styles['button']}>
              <IconButton
                icon={<EllipsisVerticalIcon className={'icon'} />}
                color={IconButtonColor.TRANSPARENT}
                disabled={true}
                className={styles['disabled-button']}
              />
            </div>
          )}
        </>
      ) : (
        user.group?.role === UserGroupRole.MODERATOR && (
          <>
            {student.role !== UserGroupRole.STUDENT ? (
              <div className={styles['button']}>
                <IconButton
                  icon={<EllipsisVerticalIcon className={'icon'} />}
                  color={IconButtonColor.TRANSPARENT}
                  onClick={() => onChange(value)}
                />
                {currentValue === value && (
                  <div
                    className={styles['moderator-dropdown-content']}
                    ref={wrapperRef}
                  >
                    <Button
                      className={styles['moderator-dropdown-button']}
                      text={'Видалити'}
                      variant={ButtonVariant.TEXT}
                      startIcon={<TrashIcon className={'icon'} />}
                      onClick={() => setIsOpenDelete(true)}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className={styles['button']}>
                <IconButton
                  icon={<EllipsisVerticalIcon className={'icon'} />}
                  color={IconButtonColor.TRANSPARENT}
                  disabled={true}
                  className={styles['disabled-button']}
                />
              </div>
            )}
          </>
        )
      )}
    </>
  );
};

export default MobileStudentsTableButtons;
