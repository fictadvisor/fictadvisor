import { Form, Formik } from 'formik';

import styles from '../test-pages.module.scss';

const FormikPage = () => {
  return (
    <div className={styles['test-page-wrap']}>
      <div className={styles['test-page-content']}>
        <Formik
          initialValues={{}}
          onSubmit={() => {
            //
          }}
        >
          {() => <Form></Form>}
        </Formik>
      </div>
    </div>
  );
};

export default FormikPage;
