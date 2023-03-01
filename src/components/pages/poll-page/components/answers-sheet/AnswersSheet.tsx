// import { Slider } from '@/components/common/ui/form';
// import { Formik, Form } from 'formik';
import React, { useEffect } from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

import Button from '@/components/common/ui/button/Button';
import { RadioGroup, Slider, TextArea } from '@/components/common/ui/form';

import { Category } from '../../PollPage';

import styles from './AnswersSheet.module.scss';

interface AnswersSheetProps {
  questions: Category;
  setProgress: React.Dispatch<React.SetStateAction<number[]>>;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
}

const AnswersSheet: React.FC<AnswersSheetProps> = ({ questions }) => {
  console.log(questions);
  const initialValues = {};

  for (const question of questions.questions) {
    if (question.type === 'SCALE') initialValues[question.id] = 1;
    console.log('initial', initialValues);
  }
  const handleSubmit = data => {
    console.log('hello', data);
  };
  const validationSchema = yup.object().shape({});

  useEffect(() => {
    for (const question of questions.questions) {
      if (question.type === 'SCALE') initialValues[question.id] = 1;
    }
    console.log('initial', initialValues);
  }, [questions, initialValues]);

  return (
    <div className={styles.wrapper}>
      <Formik
        enableReinitialize
        validateOnMount
        validateOnChange
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {() => (
          <Form className={styles['form']}>
            {questions.questions.map((question, id) => (
              <div key={id} className={styles['question']}>
                {question.type === 'TEXT' ? (
                  <p className={styles['question-number']}> Відкрите питання</p>
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
                  <TextArea className={styles['textarea']} name={question.id} />
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
              text="Наступні питання"
              type="submit"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AnswersSheet;
