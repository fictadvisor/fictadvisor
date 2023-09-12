import React from 'react';

import PollCard from '@/components/common/ui/cards/poll-card';
import TeacherHeaderCard from '@/components/common/ui/cards/teacher-header-card';
import { Category, PollTeacher } from '@/types/poll';
import { TeacherSubject } from '@/types/teacher';

import styles from './QuestionsList.module.scss';

interface QuestionListProps {
  categories: Category[];
  teacher: PollTeacher;
  subject: TeacherSubject;
  progress: number[];
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  setQuestionsListStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuestionsList: React.FC<QuestionListProps> = ({
  categories,
  teacher,
  subject,
  progress,
  current,
  setCurrent,
  setQuestionsListStatus,
}) => {
  const { lastName, firstName, middleName, avatar } = teacher;

  return (
    <div className={styles.wrapper}>
      <TeacherHeaderCard
        name={`${lastName} ${firstName} ${middleName}`}
        description={subject.name}
        url={avatar || undefined}
      />
      {categories.map((category, id) => (
        <PollCard
          key={id}
          numberOfQuestions={category.count}
          isComment={category.questions[0].type === 'TEXT'}
          questionNumber={1 + id}
          question={category.name}
          numberOfAnswered={progress[id]}
          isActive={current === id}
          onClick={() => {
            if (current !== id) setCurrent(id);
            setQuestionsListStatus(false);
          }}
        />
      ))}
    </div>
  );
};

export default QuestionsList;
