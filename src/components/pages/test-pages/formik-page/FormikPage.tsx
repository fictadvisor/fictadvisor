import { Form, Formik } from 'formik';

import Button from '@/components/common/ui/button';
import Input, { InputSize, InputType } from '@/components/common/ui/input';
import {
  FormikPageFields,
  initialValues,
  validationSchema,
} from '@/components/pages/test-pages/formik-page/utils';

import testPageStyles from '../test-pages.module.scss';
import styles from './FormikPage.module.scss';

const FormikPage = () => {
  const handleSubmit = (data: FormikPageFields) => {
    console.log(data);
  };

  return (
    <div className={testPageStyles['test-page-wrap']}>
      <div className={testPageStyles['test-page-content']}>
        <Formik
          enableReinitialize
          validateOnBlur={false}
          validateOnMount
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {() => (
            <Form className={styles['form']}>
              <Input
                size={InputSize.LARGE}
                label="Пошта"
                name="email"
                placeholder="shevchenko@gmail.com"
              />
              <Input
                size={InputSize.MEDIUM}
                type={InputType.PASSWORD}
                label="Пароль"
                name="password"
                placeholder="meni13minalo"
                isSuccessOnDefault={true}
                showRemarkOnDefault={true}
              />
              <Input
                size={InputSize.MEDIUM}
                type={InputType.PASSWORD}
                label="Підтвердіть пароль"
                name="passwordConfirmation"
                placeholder="meni13minalo"
                isSuccessOnDefault={true}
                showRemarkOnDefault={true}
              />
              <Input size={InputSize.MEDIUM} name="id" placeholder="Your id" />
              <Input
                size={InputSize.LARGE}
                type={InputType.SEARCH}
                name="search"
                placeholder="Taras Shevchenko IP-25"
              />
              <Button text="Надіслати" type="submit" />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FormikPage;
