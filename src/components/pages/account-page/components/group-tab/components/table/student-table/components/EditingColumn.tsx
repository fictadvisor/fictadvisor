import React, { FC } from 'react';
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
} from '@heroicons/react/24/outline';

import Button, {
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

import styles from '../StudentTable.module.scss';

interface EditingColumnProps {
  student: StudentTableItem;
  refetch;
}

const EditingColumn: FC<EditingColumnProps> = ({ student, refetch }) => {
  const { user } = UseAuthentication();
  const handleDelete = async () => {
    await GroupAPI.removeStudent(user.group.id, student.id);
    await refetch();
  };

  const handleChangeStatus = async () => {
    await GroupAPI.switchStudentRole(user.group.id, student.id, {
      roleName:
        student.role === StudentRole.MODERATOR ? 'STUDENT' : 'MODERATOR',
    });
    await refetch();
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
        <div>
          <Button
            text={buttonText}
            size={ButtonSize.SMALL}
            variant={ButtonVariant.OUTLINE}
            startIcon={buttonIcon}
            className={styles['role-modifier']}
            onClick={handleChangeStatus}
          />
        </div>
        <div>
          <TrashBucketButton onClick={handleDelete} />
        </div>
      </div>
    );
  }
  if (dataMapper[user.group.role] === StudentRole.MODERATOR && !student.role) {
    return <TrashBucketButton onClick={handleDelete} />;
  }
};

export default EditingColumn;
