// import { Slider } from '@/components/common/ui/form';
// import { Formik, Form } from 'formik';
import React from 'react';

import { Category } from '../../PollPage';

import styles from './AnswersSheet.module.scss';

interface AnswersSheetProps {
  questions: Category;
  setProgress: React.Dispatch<React.SetStateAction<number[]>>;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
}

const AnswersSheet: React.FC<AnswersSheetProps> = ({ questions }) => {
  console.log(questions);
  return (
    <div className={styles.wrapper}>
      {/* <Formik
          enableReinitialize
          validateOnMount
          validateOnChange
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
           {() => (
            <Form className={styles['form']}>

<Slider name={'rating'} />
            </Form>
                    )} */}
    </div>
  );
};

export default AnswersSheet;
