import React, { useEffect } from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

import ArrowButton from '@/components/common/ui/arrow-button/ArrowButton';
import Button from '@/components/common/ui/button/Button';
import { RadioGroup, Slider, TextArea } from '@/components/common/ui/form';

import { Category } from '../../PollPage';

import styles from './AnswersSheet.module.scss';

interface AnswersSheetProps {
  questions: Category;
  setProgress: React.Dispatch<React.SetStateAction<number[]>>;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  setQuestionsListStatus: React.Dispatch<React.SetStateAction<boolean>>;
  isTheLast: boolean;
  current: number;
}

const AnswersSheet: React.FC<AnswersSheetProps> = ({
  questions,
  isTheLast,
  current,
  setQuestionsListStatus,
}) => {
  const initialValues = {};

  for (const question of questions.questions) {
    if (question.type === 'SCALE') {
      initialValues[question.id] = 1;
    }
  }
  const handleSubmit = data => {
    console.log('hello', data);
  };

  let validationSchema = yup.object().shape({});

  useEffect(() => {
    const tempValidationObject = {};
    for (const question of questions.questions) {
      if (question.type === 'SCALE') {
        initialValues[question.id] = 1;
        tempValidationObject[question.id] = yup
          .string()
          .required(` ${question.name} required`);
      } else if (question.type === 'TOGGLE') {
        tempValidationObject[question.id] = yup
          .string()
          .required(` ${question.name} required`);
        initialValues[question.id] = '';
      }
      validationSchema = yup.object().shape(tempValidationObject);
    }
  }, [questions, initialValues]);

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
          validationSchema={validationSchema}
          enableReinitialize
        >
          {() => (
            <Form className={styles['form']}>
              {questions.questions.map((question, id) => (
                <div key={question.id} className={styles['question']}>
                  {question.type === 'TEXT' ? (
                    <p className={styles['question-number']}>
                      {' '}
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
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AnswersSheet;
