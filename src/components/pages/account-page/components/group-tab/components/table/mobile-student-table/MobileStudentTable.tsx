import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { PlusIcon } from '@heroicons/react/24/solid';

import { Captain } from '@/components/common/icons/Captain';
import { Moderator } from '@/components/common/icons/Moderator';
import { AlertColor } from '@/components/common/ui/alert';
import {
  IconButton,
  IconButtonShape,
} from '@/components/common/ui/icon-button/IconButton';
import Tag from '@/components/common/ui/tag-mui';
import CustomDivider from '@/components/pages/account-page/components/divider';
import MobileStudentTableButtons from '@/components/pages/account-page/components/group-tab/components/table/mobile-student-table/components/mobile-student-table-buttons';
import { StudentRole } from '@/components/pages/account-page/components/group-tab/components/table/student-table/StudentTable';
import { TextAreaPopup } from '@/components/pages/account-page/components/group-tab/components/text-area-popup';
import useAuthentication from '@/hooks/use-authentication';
import { GroupAPI } from '@/lib/api/group/GroupAPI';
import { showAlert } from '@/redux/reducers/alert.reducer';

import styles from './MobileStudentTable.module.scss';

export interface StudentTableItem {
  imgSrc?: string;
  fullName: string;
  role: string;
  email: string;
  id: string;
}

interface StudentTableProps {
  rows: StudentTableItem[];
  variant: StudentRole;
  refetch;
}

const MobileStudentTable: React.FC<StudentTableProps> = ({
  variant,
  rows,
  refetch,
}) => {
  const [openedIndex, setOpenedIndex] = useState(-1);

  const { user } = useAuthentication();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const dispatch = useDispatch();
  const handleAddStudents = async value => {
    try {
      const emails = value
        .split(/[\n\r\t ,]+/)
        .map(line => line.trim())
        .filter(line => line !== '' && line !== '\n');

      await GroupAPI.addStudentsByMail(user.group.id, { emails });
      setIsPopupOpen(false);
      refetch();
    } catch (e) {
      const name = e.response?.data.error;
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
      {variant && (
        <CustomDivider text="Студенти">
          <div className={styles['button']}>
            <IconButton
              icon={<PlusIcon className={'icon'} />}
              shape={IconButtonShape.SQUARE}
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
            <img className={styles['img']} src={row.imgSrc} alt="avatar" />
            <div className={styles['user-info']}>
              <h6 className={styles['full-name']}>{row.fullName}</h6>
              <h6 className={styles['email']}>{row.email}</h6>
            </div>
            <div className={styles['tag']}>
              {row.role && (
                <Tag
                  size="small"
                  icon={
                    row.role === StudentRole.CAPTAIN ? (
                      <Captain />
                    ) : (
                      <Moderator />
                    )
                  }
                  text=""
                />
              )}
            </div>
            <MobileStudentTableButtons
              value={index}
              currentValue={openedIndex}
              onChange={setOpenedIndex}
              variant={variant}
              student={row}
              refetch={refetch}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default MobileStudentTable;
