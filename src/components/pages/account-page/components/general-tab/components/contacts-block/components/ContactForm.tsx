import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

import { CustomCheck } from '@/components/common/icons/CustomCheck';
import { AlertColor } from '@/components/common/ui/alert';
import Button, { ButtonColor, ButtonSize } from '@/components/common/ui/button';
import { Dropdown, Input, InputSize } from '@/components/common/ui/form';
import styles from '@/components/pages/account-page/components/general-tab/GeneralTab.module.scss';
import useAuthentication from '@/hooks/use-authentication';
import { AddContactBody } from '@/lib/api/user/types/AddContactBody';
import UserAPI from '@/lib/api/user/UserAPI';
import { showAlert } from '@/redux/reducers/alert.reducer';
import { ContactType } from '@/types/contact';

interface ContactFormProps {
  refetchContacts: () => Promise<void>;
}

const ContactForm: FC<ContactFormProps> = ({ refetchContacts }) => {
  const { user } = useAuthentication();
  const dispatch = useDispatch();
  const options = Object.values(ContactType).map(contact => ({
    label: contact,
    value: contact,
  }));

  const handleSubmit = async (data: AddContactBody) => {
    try {
      await UserAPI.addContact(user.id, data);
      void refetchContacts();
    } catch (e) {
      dispatch(
        showAlert({
          title: 'Здається ти ввів неправильні значення!',
          color: AlertColor.ERROR,
        }),
      );
    }
  };

  return (
    <div className={styles['add-social-links-container']}>
      <Formik
        enableReinitialize
        // TODO: move to constants folder
        validationSchema={yup.object().shape({
          displayName: yup.string().required(`Обов'язкове поле`),
          link: yup.string().required(`Обов'язкове поле`),
          name: yup.string().required(`Обов'язкове поле`),
        })}
        // TODO: move to constants folder
        initialValues={{
          name: ContactType.TELEGRAM,
          link: '',
          displayName: '',
        }}
        onSubmit={handleSubmit}
      >
        {({}) => (
          <Form>
            <Dropdown
              options={options}
              name="name"
              label="Соціальна мережа"
              placeholder="Введіть назву соц. мережі"
            />
            <Input
              label="Посилання"
              size={InputSize.LARGE}
              name="link"
              placeholder="Введіть посилання"
            />
            <Input
              label="Відображуване ім'я"
              size={InputSize.LARGE}
              name="displayName"
              placeholder="Введіть відображуване ім'я"
            />
            <Button
              text="Додати"
              color={ButtonColor.SECONDARY}
              startIcon={<CustomCheck />}
              size={ButtonSize.SMALL}
              type="submit"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;
