import { PlusIcon } from '@heroicons/react/24/solid';

import Button from '@/components/common/ui/button';
import Divider, { DividerTextPosition } from '@/components/common/ui/divider';
import {
  IconButton,
  IconButtonShape,
} from '@/components/common/ui/icon-button/IconButton';
import MobileRequestTable from '@/components/pages/account-page/components/table/mobile-request-table';
import MobileStudentTable from '@/components/pages/account-page/components/table/mobile-student-table';
import { StudentRole } from '@/components/pages/account-page/components/table/student-table/StudentTable';
import { transformData } from '@/components/pages/account-page/components/table/student-table/utils';
import { testData } from '@/components/pages/account-page/testData';
import useAuthentication from '@/hooks/use-authentication';

import styles from './MobileStudentTab.module.scss';

const getRequest = (requests: object, role: StudentRole) => {
  if (requests && role) {
    return (
      <div className={styles['requests']}>
        <div className={styles['division']}>
          <Divider
            textPosition={DividerTextPosition.RIGHT}
            text={'Нові Запити'}
          />
        </div>
        <MobileRequestTable rows={transformData(testData)} />
      </div>
    );
  }
};

const MobileStudentTab = () => {
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
          <Divider textPosition={DividerTextPosition.RIGHT} text={'Студенти'} />
          <div className={styles['button']}>
            <IconButton
              icon={<PlusIcon className={'icon'} />}
              shape={IconButtonShape.SQUARE}
            />
          </div>
        </div>
      )}
      <MobileStudentTable
        variant={StudentRole.CAPTAIN}
        rows={transformData(testData)}
      />
    </div>
  );
};

export default MobileStudentTab;
