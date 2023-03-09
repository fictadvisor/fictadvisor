import { FC } from 'react';
import Link from 'next/link';

import { LecturerPollCard } from '@/components/common/composite/cards/Cards';
import { PollTeachersDTO } from '@/lib/api/poll/dto/PollTeachersDTO';

import styles from '../SearchPage.module.scss';

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
          <Link key={index} href={`/poll/${teacher.disciplineTeacherId}`}>
            <LecturerPollCard
              key={teacher.disciplineTeacherId}
              description={teacher.subject.name}
              avatar={teacher.avatar}
              name={`${teacher.lastName} ${teacher.firstName} ${teacher.middleName}`}
              roles={teacher.roles}
            />
          </Link>
        ))}
    </ul>
  );
};

export default PollTeacherSearchList;
