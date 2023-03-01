// import { Slider } from '@/components/common/ui/form';
// import { Formik, Form } from 'formik';
import React from 'react';

import styles from './AnswersSheet.module.scss';

const AnswersSheet = () => {
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
