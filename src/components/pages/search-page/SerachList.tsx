import { FC } from 'react';

import { RatingCard } from '@/components/common/composite/cards/Cards';
import { GetTeacherDTO } from '@/lib/api/teacher/dto/GetTeacherDTO';

import styles from './SearchPage.module.scss';

interface SearchListProps {
  items?: GetTeacherDTO[];
}

export const SearchList = ({ items }: SearchListProps) => {
  return (
    <ul className={styles['search-list']}>
      {items &&
        items?.map(teacher => (
          <li key={teacher.id}>
            <RatingCard
              name={`${teacher.lastName} ${teacher.firstName} ${teacher.middleName} `}
            />
          </li>
        ))}
    </ul>
  );
};
