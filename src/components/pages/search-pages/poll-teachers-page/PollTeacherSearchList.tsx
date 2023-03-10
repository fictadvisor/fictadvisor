import { FC } from 'react';

import { PollTeacherCard } from '@/components/common/composite/cards/poll-teacher-card';
import { PollTeachersDTO } from '@/lib/api/poll/dto/PollTeachersDTO';

import styles from './PollTeacherSearchList.module.scss';

interface PollTeacherSearchListProps {
  data: PollTeachersDTO;
  className: string;
}
const PollTeacherSearchList: FC<PollTeacherSearchListProps> = ({
  data,
  className,
}) => {
  return (
    <ul className={styles[`${className}-search-list`]}>
      {data &&
        data.teachers?.map(teacher => (
          <PollTeacherCard
            key={teacher.disciplineTeacherId}
            description={teacher.subject.name}
            avatar={teacher.avatar}
            name={`${teacher.lastName} ${teacher.firstName} ${teacher.middleName}`}
            roles={teacher.roles}
            href={`/poll/${teacher.disciplineTeacherId}`}
          />
        ))}
    </ul>
  );
};

export default PollTeacherSearchList;
