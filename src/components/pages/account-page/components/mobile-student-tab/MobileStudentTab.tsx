import { FC } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';

import {
  IconButton,
  IconButtonShape,
} from '@/components/common/ui/icon-button/IconButton';
import MobileRequestTable from '@/components/pages/account-page/components/table/mobile-request-table';
import MobileStudentTable from '@/components/pages/account-page/components/table/mobile-student-table';
import { StudentRole } from '@/components/pages/account-page/components/table/student-table/StudentTable';
import {
  dataMapper,
  transformRequestsData,
  transformStudentsData,
} from '@/components/pages/account-page/components/table/student-table/utils';

import styles from './MobileStudentTab.module.scss';

const getRequest = (requests: object, role: StudentRole) => {
  if (requests && role) {
    return (
      <div className={styles['requests']}>
        <div className={styles['division']}>
          <h4 className={styles['division-text']}>Нові запити</h4>
          <div className={styles['white']}></div>
        </div>
        <MobileRequestTable rows={transformRequestsData(requests)} />
      </div>
    );
  }
};

interface MobileStudentTabProps {
  user;
  requests;
  students;
}

const MobileStudentTab: FC<MobileStudentTabProps> = ({
  user,
  requests,
  students,
}) => {
  return (
    <div className={styles['content']}>
      <div className={styles['text-content']}>
        <h4>Список групи</h4>
        <h4>{user.group.code}</h4>
      </div>
      {getRequest(requests, user.group.role)}
      {user.group.role && (
        <div className={styles['division']}>
          <h4 className={styles['division-text']}>Студенти</h4>
          <div className={styles['white']}></div>
          <div className={styles['button']}>
            <IconButton
              icon={<PlusIcon className={'icon'} />}
              shape={IconButtonShape.SQUARE}
            />
          </div>
        </div>
      )}
      <MobileStudentTable
        variant={dataMapper[user.group.role]}
        rows={transformStudentsData(students)}
      />
    </div>
  );
};

export default MobileStudentTab;
