import React, { useEffect } from 'react';
import { Form, Formik } from 'formik';

import ArrowButton from '@/components/common/ui/arrow-button/ArrowButton';
import Button from '@/components/common/ui/button/Button';
import { RadioGroup, Slider, TextArea } from '@/components/common/ui/form';

import { Category, Question } from '../../PollPage';
import { Answer } from '../poll-form/PollForm';

import styles from './AnswersSheet.module.scss';

interface AnswersSheetProps {
  questions: Category;
  setProgress: React.Dispatch<React.SetStateAction<number[]>>;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  setQuestionsListStatus: React.Dispatch<React.SetStateAction<boolean>>;
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
  isTheLast: boolean;
  isValid: boolean;
  current: number;
  answers: Answer[];
  setAnswers: React.Dispatch<React.SetStateAction<Answer[]>>;
}

const initialValues = {};

const collectAnswers = (answers: Answer[], values) => {
  let resultAnswers = [...answers];
  for (const valueId of Object.keys(values)) {
    const index = resultAnswers.findIndex(el => el.questionId === valueId);
    if (index !== -1) {
      resultAnswers[index].value = values[valueId];
    } else {
      resultAnswers = [
        ...resultAnswers,
        { value: values[valueId], questionId: valueId },
      ];
    }
  }
  return resultAnswers;
};

const getProgress = (answers: Answer[], questions) => {
  let count = 0;
  const resultAnswers = [...answers];
  for (const question of questions) {
    const isCompleted =
      // question.isRequired &&
      resultAnswers.find(answer => answer.questionId === question.id);
    if (isCompleted) count++;
  }
  return count;
};

const AnswersSheet: React.FC<AnswersSheetProps> = ({
  questions,
  isTheLast,
  current,
  answers,
  setQuestionsListStatus,
  setAnswers,
  setIsValid,
  setProgress,
  isValid,
  setCurrent,
}) => {
  for (const question of questions.questions) {
    if (question.type === 'SCALE') {
      initialValues[question.id] = 1;
    }
  }
  const handleSubmit = data => {
    console.log('hello', data);
  };

  useEffect(() => {
    for (const question of questions.questions) {
      if (question.type === 'SCALE') {
        initialValues[question.id] = '1';
      }
    }
  }, [questions]);

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.toQuestionsList}
        onClick={() => {
          setQuestionsListStatus(true);
        }}
      >
        <ArrowButton className={styles.arrow} />
        <b>
          {current + 1} . {questions.name}
        </b>
      </div>
      <div className={styles.answersWrapper}>
        <Formik
          validateOnMount
          validateOnChange
          initialValues={initialValues}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values }) => (
            <Form
              onChange={() => {
                const resultAnswers = collectAnswers(answers, values); // question =)
                setAnswers(resultAnswers);
              }}
              className={styles['form']}
            >
              {questions.questions.map((question, id) => (
                <div key={question.id} className={styles['question']}>
                  {question.type === 'TEXT' ? (
                    <p className={styles['question-number']}>
                      Відкрите питання
                    </p>
                  ) : (
                    <p className={styles['question-number']}>
                      Питання {id + 1} / {questions.count}
                    </p>
                  )}

                  <b className={styles['question-title']}>{question.name}</b>
                  {question.description && (
                    <p className={styles['question-description']}>
                      {question.description}
                    </p>
                  )}
                  {question.type === 'SCALE' ? (
                    <Slider className={styles['slider']} name={question.id} />
                  ) : question.type === 'TOGGLE' ? (
                    <RadioGroup
                      className={styles['options']}
                      options={[
                        { value: '1', label: 'так' },
                        { value: '0', label: 'ні' },
                      ]}
                      name={question.id}
                    />
                  ) : (
                    <TextArea
                      className={styles['textarea']}
                      name={question.id}
                    />
                  )}
                  {question.criteria && (
                    <p className={styles['question-criteria']}>
                      {question.criteria}
                    </p>
                  )}
                </div>
              ))}
              <Button
                className={styles['button']}
                text={isTheLast ? 'Завершити опитування' : 'Наступні питання'}
                type="submit"
                disabled={isTheLast && !isValid}
                onClick={() => {
                  if (!isTheLast) {
                    setCurrent(prev => ++prev);
                    const resultAnswers = collectAnswers(answers, values);
                    setAnswers(resultAnswers);
                    const count = getProgress(
                      resultAnswers,
                      questions.questions,
                    );
                    console.log(count);
                    setProgress(previousProgress => {
                      const temp = [...previousProgress];
                      temp[current] = count;
                      return temp;
                    });
                  }
                }}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AnswersSheet;
