import { Form, Formik } from 'formik';

import { TextArea } from '@/components/common/ui/form';

import { FormikPageFields, initialValues, validationSchema } from './utils';

import testPageStyles from '../test-pages.module.scss';
import styles from './TextArea.module.scss';

const TextAreaPage = () => {
  const handleSubmit = (data: FormikPageFields) => {
    console.log(data);
  };

  return (
    <div className={testPageStyles['test-page-wrap']}>
      <div className={testPageStyles['test-page-content']}>
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
              <TextArea name="review" defaultRemark={'Text area remark'} />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TextAreaPage;
