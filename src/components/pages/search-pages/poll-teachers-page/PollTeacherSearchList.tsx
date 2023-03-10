import { FC } from 'react';
import Link from 'next/link';

import { LecturerPollCard } from '@/components/common/composite/cards/Cards';
import { PollTeachersDTO } from '@/lib/api/poll/dto/PollTeachersDTO';

import styles from './PollTeacherSearchList.module.scss';
import { PollTeacherCard } from '@/components/common/composite/cards/poll-teacher-card';

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
        data.teachers?.map((teacher, index) => (
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
