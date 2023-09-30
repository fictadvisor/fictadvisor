import React from 'react';
import { Box } from '@mui/material';

import PollCard from '@/components/common/ui/cards/poll-card';
import TeacherHeaderCard from '@/components/common/ui/cards/teacher-header-card';
import { GetTeacherQuestionsResponse } from '@/lib/api/poll/types/GetTeacherQuestionsResponse';
import { usePollStore } from '@/store/poll-page/usePollStore';

import * as styles from './QuestionsList.styles';

interface QuestionListProps {
  data: GetTeacherQuestionsResponse;
  progress: number[];
}
const QuestionsList: React.FC<QuestionListProps> = ({ data, progress }) => {
  const { subject, teacher, categories } = data;
  const { lastName, firstName, middleName, avatar } = teacher;
  const { currentCategory, setCurrentCategory, setQuestionsListOpened } =
    usePollStore(state => ({
      currentCategory: state.currentCategory,
      setCurrentCategory: state.setCurrentCategory,
      setQuestionsListOpened: state.setQuestionsListOpened,
    }));

  const handleClick = (id: number) => {
    if (currentCategory !== id) setCurrentCategory(id);
    setQuestionsListOpened(false);
  };

  return (
    <Box sx={styles.wrapper}>
      <TeacherHeaderCard
        name={`${lastName} ${firstName} ${middleName}`}
        description={subject.name}
        url={avatar || undefined}
      />
      {categories.map((category, id) => (
        <Box key={id}>
          <PollCard
            key={id}
            numberOfQuestions={category.count}
            isComment={category.questions[0].type === 'TEXT'}
            questionNumber={1 + id}
            question={category.name}
            numberOfAnswered={progress[id]}
            isActive={currentCategory === id}
            onClick={() => {
              handleClick(id);
            }}
          />
        </Box>
      ))}
    </Box>
  );
};

export default QuestionsList;
