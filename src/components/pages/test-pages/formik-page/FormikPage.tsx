import { Form, Formik } from 'formik';

import Button from '@/components/common/ui/button';
import Checkbox from '@/components/common/ui/checkbox';
import Dropdown from '@/components/common/ui/dropdown';
import Input, { InputSize, InputType } from '@/components/common/ui/input';
import RadioGroup, { Radio } from '@/components/common/ui/radio-group';
import Switch from '@/components/common/ui/switch';
import TextArea from '@/components/common/ui/text-area';
import {
  FormikPageFields,
  initialValues,
  validationSchema,
} from '@/components/pages/test-pages/formik-page/utils';

import testPageStyles from '../test-pages.module.scss';
import styles from './FormikPage.module.scss';

const FormikPage = () => {
  const groups = [
    { value: 'IP-15', label: 'ІП-15' },
    { value: 'IP-14', label: 'ІП-14' },
    { value: 'IP-13', label: 'ІП-13' },
    { value: 'IP-12', label: 'ІП-12' },
    { value: 'IP-11', label: 'ІП-11' },
  ];

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
              <Dropdown
                name="group"
                options={groups}
                label={'Група'}
                isSuccessOnDefault={true}
                showRemarkOnDefault={true}
              />
              <Input
                size={InputSize.LARGE}
                type={InputType.SEARCH}
                name="search"
                placeholder="Taras Shevchenko IP-25"
              />
              <TextArea
                name="review"
                isSuccessOnDefault={true}
                showRemarkOnDefault={true}
              />
              <Checkbox name="isCaptain" text="Староста групи" />
              <Switch
                name="notification"
                text="Бажаєте отримувати сповіщення?"
              />
              <RadioGroup name={'fruit'} isDisabled={false}>
                <Radio text={'яблуко'} value={'apple'} />
                <Radio text={'апельсин'} value={'orange'} />
                <Radio text={'банан'} value={'banana'} />
              </RadioGroup>
              <Button text="Надіслати" type="submit" />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FormikPage;
