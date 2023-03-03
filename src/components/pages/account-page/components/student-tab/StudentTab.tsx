import { FC } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';

import Button from '@/components/common/ui/button';
import RequestTable from '@/components/pages/account-page/components/table/request-table';
import StudentTable from '@/components/pages/account-page/components/table/student-table';
import { StudentRole } from '@/components/pages/account-page/components/table/student-table/StudentTable';
import {
  dataMapper,
  transformRequestsData,
  transformStudentsData,
} from '@/components/pages/account-page/components/table/student-table/utils';

import styles from './StudentsTab.module.scss';

const getRequest = (requests: object, role: StudentRole) => {
  if (requests && role) {
    return (
      requests && (
        <div className={styles['requests']}>
          <div className={styles['division']}>
            <h4 className={styles['division-text']}>Нові запити</h4>
            <div className={styles['white']}></div>
          </div>
          <RequestTable rows={transformRequestsData(requests)} />
        </div>
      )
    );
  }
};

interface StudentTabProps {
  user;
  requests;
  students;
}

const StudentTab: FC<StudentTabProps> = ({ requests, students }) => {
  const { user } = useAuthentication();

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
            <Button
              text={'Додати студента'}
              startIcon={<PlusIcon className={'icon'} />}
              className={styles['add-button']}
            />
          </div>
        </div>
      )}
      <StudentTable
        variant={dataMapper[user.group.role]}
        rows={transformStudentsData(students)}
      />
    </div>
  );
};

export default StudentTab;
