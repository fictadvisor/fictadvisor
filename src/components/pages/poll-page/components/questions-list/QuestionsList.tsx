import React, { useEffect } from 'react';

import {
  LecturerHeaderCard,
  PollCard,
} from '@/components/common/composite/cards';

import { Category, Subject, Teacher } from '../../PollPage';

import styles from './QuestionsList.module.scss';

interface QuestionListProps {
  categories: Category[];
  teacher: Teacher;
  subject: Subject;
}
const QuestionsList: React.FC<QuestionListProps> = ({
  categories,
  teacher,
  subject,
}) => {
  const { lastName, firstName, middleName, avatar } = teacher;
  useEffect(() => {
    console.log(categories);
  }, []);

  return (
    <div className={styles.wrapper}>
      <LecturerHeaderCard
        name={`${lastName} ${firstName} ${middleName}`}
        description={subject.name}
        url={avatar || undefined}
      />
      {categories.slice(0, categories.length - 1).map((category, id) => (
        <PollCard
          key={id}
          numberOfQuestions={category.count}
          questionNumber={1 + id}
          question={category.name}
          numberOfAnswered={2}
        />
      ))}
      <PollCard
        questionNumber={categories.length}
        question={'Ваш коментар'}
        isComment={true}
        numberOfQuestions={1}
        numberOfAnswered={1}
      />
    </div>
  );
};

export default QuestionsList;
