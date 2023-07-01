import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { PlusIcon } from '@heroicons/react/24/solid';
import { AxiosError } from 'axios';

import { AlertColor } from '@/components/common/ui/alert';
import Button from '@/components/common/ui/button';
import Tag from '@/components/common/ui/tag-mui';
import { TagSize, TagVariant } from '@/components/common/ui/tag-mui/types';
import CustomDivider from '@/components/pages/account-page/components/divider';
import roleNamesMapper from '@/components/pages/account-page/components/group-tab/components/table/constants';
import EditingColumn from '@/components/pages/account-page/components/group-tab/components/table/student-table/components/EditingColumn';
import { TextAreaPopup } from '@/components/pages/account-page/components/group-tab/components/text-area-popup';
import useAuthentication from '@/hooks/use-authentication';
import GroupAPI from '@/lib/api/group/GroupAPI';
import { showAlert } from '@/redux/reducers/alert.reducer';
import { UserGroupRole } from '@/types/user';

import { StudentsTableProps } from '../types';

import styles from './StudentsTable.module.scss';

const StudentsTable: React.FC<StudentsTableProps> = ({
  role,
  rows,
  refetch,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { user } = useAuthentication();
  const dispatch = useDispatch();
  const handleAddStudents = async (value: string) => {
    try {
      const emails = value
        .split(/[\n\r\t ,]+/)
        .map(line => line.trim())
        .filter(line => line !== '' && line !== '\n');

      // TODO: remove as and refactor props
      await GroupAPI.addStudentsByMail(user.group?.id as string, { emails });
      setIsPopupOpen(false);
      await refetch();
    } catch (error) {
      // TODO: refactor this shit
      const name = (error as AxiosError<{ error: string }>).response?.data
        .error;
      if (name === 'AlreadyRegisteredException') {
        dispatch(
          showAlert({
            title: 'Один або декілька користувачів вже зареєстровані!',
            color: AlertColor.ERROR,
          }),
        );
      } else {
        dispatch(
          showAlert({
            title: 'Здається ти ввів неправильні значення!',
            color: AlertColor.ERROR,
          }),
        );
      }
    }
  };

  return (
    <>
      {isPopupOpen && (
        <TextAreaPopup
          handleSubmit={handleAddStudents}
          closeFunction={() => setIsPopupOpen(false)}
        />
      )}
      {role && (
        <CustomDivider text="Студенти">
          <div className={styles['button']}>
            <Button
              text={'Додати студента'}
              startIcon={<PlusIcon className={'icon'} />}
              onClick={() => setIsPopupOpen(true)}
            />
          </div>
        </CustomDivider>
      )}
      <div className={styles['table']}>
        {rows.map((row, index) => (
          <div
            key={index}
            className={
              styles[
                rows.length === 1
                  ? 'table-container-one'
                  : index === rows.length - 1
                  ? 'table-container-end'
                  : index === 0
                  ? 'table-container-start'
                  : 'table-container'
              ]
            }
          >
            <div className={styles['user-info']}>
              <img className={styles['img']} src={row.imgSrc} alt="avatar" />
              <div className={styles['full-name']}>{row.fullName}</div>
              <div className={styles['tag-container']}>
                {row.role !== UserGroupRole.STUDENT && (
                  <div className={styles['tag']}>
                    <Tag
                      text={roleNamesMapper[row.role]}
                      variant={TagVariant.DARKER}
                      size={TagSize.SMALL}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className={styles['other-content']}>
              <div className={styles['email']}>{row.email}</div>
              <div className={styles['side-buttons']}>
                <EditingColumn student={row} refetch={refetch} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default StudentsTable;
