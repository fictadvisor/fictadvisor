import { PlusIcon } from '@heroicons/react/24/solid';

import Button from '@/components/common/ui/button';
import RequestTable from '@/components/pages/account-page/components/table/request-table';
import StudentTable from '@/components/pages/account-page/components/table/student-table';
import { StudentRole } from '@/components/pages/account-page/components/table/student-table/StudentTable';
import { transformData } from '@/components/pages/account-page/components/table/student-table/utils';
import { testData } from '@/components/pages/account-page/testData';
import useAuthentication from '@/hooks/use-authentication';

import styles from './StudentsTab.module.scss';

const getRequest = (requests: object, role: StudentRole) => {
  if (requests && role) {
    return (
      <div className={styles['requests']}>
        <div className={styles['division']}>
          <h4 className={styles['division-text']}>Нові запити</h4>
          <div className={styles['white']}></div>
        </div>
        <RequestTable rows={transformData(testData)} />
      </div>
    );
  }
};

const StudentTab = () => {
  const { user } = useAuthentication();
  return (
    <div className={styles['content']}>
      <div className={styles['text-content']}>
        <h4>Список групи</h4>
        <h4>{user.group.code}</h4>
      </div>
      {getRequest(transformData(testData), user.group.role)}
      {user.group.role && (
        <div className={styles['division']}>
          <h4 className={styles['division-text']}>Нові запити</h4>
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
        variant={StudentRole.CAPTAIN}
        rows={transformData(testData)}
      />
    </div>
  );
};

export default StudentTab;
