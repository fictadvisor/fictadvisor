import React, { FC } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';

import { TextArea } from '@/components/common/ui/form';
import { SliderSize } from '@/components/common/ui/form/slider/types';
import FormikRadioGroup from '@/components/common/ui/form/with-formik/radio/FormikRadioGroup';
import FormikSlider from '@/components/common/ui/form/with-formik/slider';
import theme from '@/styles/theme';
import { Question, QuestionType } from '@/types/poll';

import * as styles from './SingleQuestion.style';

interface QuestionProps {
  id: number;
  count?: number;
  question: Question;
}

const optionsRadioGroup = [
  { value: '1', label: 'так' },
  { value: '0', label: 'ні' },
];

const QuestionToggle: FC<QuestionProps> = ({ question, ...rest }) => {
  return (
    <FormikRadioGroup
      options={optionsRadioGroup}
      sx={styles.radioGroup}
      name={question.id}
    />
  );
};

const QuestionScale: FC<QuestionProps> = ({ question, ...rest }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('desktop'));
  return (
    <FormikSlider
      sx={{ mt: '10px' }}
      name={question.id}
      size={isMobile ? SliderSize.SMALL : SliderSize.MEDIUM}
    />
  );
};

const SingleQuestion: FC<QuestionProps> = ({ id, question, count }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('desktop'));
  const numberRowsTextArea = isMobile ? 8 : 4;
  const questionNumber =
    question.type === QuestionType.TEXT
      ? `Відкрите питання`
      : `Питання ${id + 1} / ${count}`;

  return (
    <Box key={question.id}>
      <Typography component="p" sx={styles.questionNumber}>
        {questionNumber}
      </Typography>
      <Typography component="p" sx={styles.questionTitle}>
        {question.text}
      </Typography>
      {question.description && (
        <Typography component="p" sx={styles.questionDescription}>
          {question.description}
        </Typography>
      )}
      {question.type === QuestionType.SCALE && (
        <QuestionScale question={question} id={id} />
      )}
      {question.type === QuestionType.TOGGLE && (
        <QuestionToggle question={question} id={id} />
      )}
      {question.type === QuestionType.TEXT && (
        <TextArea
          showRemark
          rowsNumber={numberRowsTextArea}
          name={question.id}
        />
      )}
      {question.criteria && (
        <Typography component="p" sx={styles.questionCriteria}>
          {question.criteria}
        </Typography>
      )}
    </Box>
  );
};

export default SingleQuestion;
