import React, { FC, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  EllipsisVerticalIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

import { Popup } from '@/components/common/composite/popup';
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
import { StudentTableItem } from '@/components/pages/account-page/components/group-tab/components/table/mobile-student-table/MobileStudentTable';
import { StudentRole } from '@/components/pages/account-page/components/group-tab/components/table/student-table/StudentTable';
import dataMapper from '@/components/pages/account-page/components/group-tab/components/table/student-table/utils';
import useAuthentication from '@/hooks/use-authentication';
import useOutsideClick from '@/hooks/use-outside-click';
import { GroupAPI } from '@/lib/api/group/GroupAPI';
import { showAlert } from '@/redux/reducers/alert.reducer';

import styles from './MobileStudentTableButtons.module.scss';

export interface MobileStudentTableButtonsProps {
  value: number;
  currentValue: number;
  onChange: (value) => void;
  student: StudentTableItem;
  variant?: string;
  refetch;
}

const MobileStudentTableButtons: FC<MobileStudentTableButtonsProps> = ({
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

  const buttonIcon = student.role ? (
    <ArrowDownCircleIcon className="icon" />
  ) : (
    <ArrowUpCircleIcon className="icon" />
  );

  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, () => onChange(-1));

  const buttonName = student.role ? StudentRole.STUDENT : StudentRole.MODERATOR;
  return (
    <>
      {isOpenChange && (
        <Popup
          isClosable={true}
          hasIcon={true}
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
          closeFunction={() => setIsOpenChange(false)}
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
      )}
      {isOpenDelete && (
        <Popup
          isClosable={true}
          hasIcon={true}
          title="Видалити користувача"
          text={`Чи дійсно ви бажаєте видалити користувача ${student.fullName}? Якщо ви випадково видалите користувача, йому треба буд відправити повторний запит до групи.`}
          closeFunction={() => setIsOpenDelete(false)}
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
      )}
      {dataMapper[user.group.role] === StudentRole.CAPTAIN ? (
        <>
          {student.role !== StudentRole.CAPTAIN ? (
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
        dataMapper[user.group.role] === StudentRole.MODERATOR && (
          <>
            {!student.role ? (
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

export default MobileStudentTableButtons;
